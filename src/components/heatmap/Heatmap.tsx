import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Container from "typedi";

import { switchMenuButtons } from "./helper";
import { classNames } from "../../helpers/classnames";

import ContainerLines from "./ContainerLines";
import LeftLineRow from "./LeftLineRow";
import HeatmapList from "./HeatmapList";
import ButtonsSwitchGradient from "../buttonsSwitchMenu/buttonSwitchGradient";
import { LegendItem } from "../../pages/Stacker5Page/components/LegendItem";
import BottomLineRow from "./BottomLineRow";

import styles from "./Heatmap.module.scss";
import { Loader } from "../loader";
import { WarehouseService } from "../../services/WarehouseService";
import { MainChartsService } from "../../services/MainChartsService";
import Range from "../../pages/Stacker5Page/components/stackerRange/Range";
import { useHeatmapHeight } from "./hooks/useHeatmapHeight";
import { PilesList } from "./components/PilesList";

export type TValues = "Метры" | "Ряды" | "Слои";

interface IHeatmapProps {
  numberOfRows: number;
  endMeter: number;
  startMeter: number;
  direction: "row" | "column";
  leftValue: TValues;
  bottomValue: TValues;
  title: string;
  onClick: () => void;
  showButton: boolean;
  showGradient: boolean;
}
const warehouseService = Container.get(WarehouseService);
const mainChartsService = Container.get(MainChartsService);

export const Heatmap = observer(
  ({
    numberOfRows,
    endMeter,
    startMeter,
    leftValue,
    bottomValue,
    direction,
    title,
    onClick,
    showButton,
    showGradient,
  }: IHeatmapProps) => {
    const wareHouseItems = warehouseService.warehouseItems;
    const setCommonView = warehouseService.setCommonView.bind(warehouseService);
    const getComposition = warehouseService.getComposition.bind(warehouseService);
    const getAggregatedComposition = warehouseService.getAggregatedComposition.bind(warehouseService);
    const upperGradient = mainChartsService.upperGradient;
    const sliceGradient = mainChartsService.sliceGradient;
    const setIsHeatmapDirty = warehouseService.setIsHeatmapDirty.bind(warehouseService);
    const pile = warehouseService.currentPile;

    const archivedPilesItems = warehouseService.archivedPilesItems;
    const currentArchiveId = warehouseService.currentArchiveId;
    const { number: currentWarehouseNumber } = warehouseService.currentWarehouse;

    const { stackerIsRun, stackerRow } = (() => {
      if (currentArchiveId) {
        const current = archivedPilesItems.find((item) => item.id === currentArchiveId);

        if (current) {
          return { stackerIsRun: !!pile?.stackerIsRun, stackerRow: -1 };
        }
      }

      return { stackerIsRun: !!pile?.stackerIsRun, stackerRow: pile?.currentFillingRow };
    })();

    const { ref } = useHeatmapHeight();

    const fetchCompositionAndIndexes = React.useCallback(() => {
      getComposition({});
      getAggregatedComposition({});
      setCommonView();
      setIsHeatmapDirty(false);
    }, []);

    useEffect(() => {
      fetchCompositionAndIndexes();
    }, [currentWarehouseNumber]);

    const gradient = direction === "column" ? sliceGradient : upperGradient;

    if (wareHouseItems.length === 0) {
      return (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      );
    }

    return (
      <div ref={ref} className={styles.wrapper}>
        <header className={styles.heatmapHeader}>
          <div className={styles.heatmapHeaderTitle}>{title}</div>
          <ButtonsSwitchGradient direction={direction} selectedKey={gradient} items={switchMenuButtons} />
        </header>
        <div
          className={classNames(styles.container, {
            [styles.reverse]: direction === "column",
            [styles.centered]:
              (direction === "row" && endMeter - startMeter <= 150) || (direction === "column" && numberOfRows <= 15),
          })}
        >
          <HeatmapList
            gradientMode={gradient}
            onClick={onClick}
            leftValue={leftValue}
            bottomValue={bottomValue}
            numberOfRows={numberOfRows}
            direction={direction}
            startMeter={startMeter}
            endMeter={endMeter}
          />
          <ContainerLines bottomValue={bottomValue} leftValue={leftValue} />
          <LeftLineRow direction={direction} numberOfRows={direction === "column" ? endMeter : numberOfRows} />
          <BottomLineRow
            bottomValue={bottomValue}
            startMeter={startMeter}
            endMeter={direction === "column" ? numberOfRows : endMeter}
          />
        </div>

        <div className={styles.menu}>
          <LegendItem
            color={stackerIsRun ? "#13A10E" : "#EE5157"}
            value={stackerRow}
            label="Положение штабелеукладчика / номер ряда"
          />
          {showButton && (
            <div
              onClick={fetchCompositionAndIndexes}
              className={classNames(styles.warehouseActionsUpdate, { [styles.active]: stackerIsRun })}
            >
              Общий вид
            </div>
          )}
          {showGradient && (
            <div className={styles.rangeMain}>
              {showGradient && gradient !== "none" && <Range gradient={gradient} />}
            </div>
          )}
        </div>
        {direction === "column" && <PilesList />}
      </div>
    );
  },
);
