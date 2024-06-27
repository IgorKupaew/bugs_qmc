import { observer } from "mobx-react-lite";
import Container from "typedi";

import { IComposition, WarehouseService } from "../../services/WarehouseService";

import { IGradientThresholds } from "../../types";

import { classNames } from "../../helpers/classnames";
import styles from "./Heatmap.module.scss";
import { useStackerData } from "./hooks/useStackerData";

interface IHeatmapListProps {
  endMeter: number;
  direction: "row" | "column";
  numberOfRows: number;
  onClick: (layer: number, row: number) => void;
  gradientMode: string;
}

const warehouseService = Container.get(WarehouseService);

const HeatmapListUnreverse = observer(
  ({ gradientMode, endMeter, direction, numberOfRows, onClick }: IHeatmapListProps) => {
    const gradientThresholds: IGradientThresholds = warehouseService.gradientThresholds;
    const compositions = warehouseService.compositions;
    const pile = warehouseService.currentPile;

    const { stackerData: stacker, isStackerExist } = useStackerData();

    return (
      <>
        {Array.from({ length: endMeter }, (_, index) => {
          const currentLayer = index;
          return (
            <div
              id={currentLayer.toString()}
              className={classNames(styles.row, {
                [styles.reverse]: direction === "column",
                [styles.withHover]: true,
              })}
            >
              {Array.from({ length: numberOfRows }, (_, index) => {
                const currentRow = index + 1;

                let current = compositions.find((item) => item.layer === currentLayer && item.row === currentRow);
                let value = current ? +current[gradientMode as keyof IComposition] : 0;

                const hasAnyData = current?.kh || current?.p || current?.n;

                const isGreatThan6 =
                  value !== null &&
                  value !== 0 &&
                  ((gradientMode === "kh" && value > gradientThresholds.khThreshold2) ||
                    (gradientMode === "p" && value > gradientThresholds.pThreshold2) ||
                    (gradientMode === "n" && value > gradientThresholds.nThreshold2));

                const isLessThan2 =
                  value !== null &&
                  value !== 0 &&
                  ((gradientMode === "kh" && value <= gradientThresholds.khThreshold1) ||
                    (gradientMode === "p" && value <= gradientThresholds.pThreshold1) ||
                    (gradientMode === "n" && value <= gradientThresholds.nThreshold1));

                const middle =
                  value !== null &&
                  value !== 0 &&
                  ((gradientMode === "kh" &&
                    value < gradientThresholds.khThreshold2 &&
                    value > gradientThresholds.khThreshold1) ||
                    (gradientMode === "p" &&
                      value < gradientThresholds.pThreshold2 &&
                      value > gradientThresholds.pThreshold1) ||
                    (gradientMode === "n" &&
                      value < gradientThresholds.nThreshold2 &&
                      value > gradientThresholds.nThreshold1));

                return (
                  <div
                    onClick={() => {
                      onClick(currentLayer, currentRow);
                    }}
                    id={currentRow.toString()}
                    className={
                      currentLayer === stacker.layer && currentRow === stacker.row && isStackerExist
                        ? classNames(styles.stacker, {
                            [styles.reverse]: direction === "column",
                            [styles.disabled]: !pile?.stackerIsRun,
                          })
                        : (currentLayer === stacker.layer && currentRow > stacker.row) || currentLayer > stacker.layer
                        ? classNames(
                            gradientMode === "kh"
                              ? styles.greaterOff
                              : gradientMode === "p"
                              ? styles.greaterOff
                              : gradientMode === "n"
                              ? styles.greaterOff
                              : gradientMode === "none"
                              ? styles.greaterOff
                              : "",
                            {
                              [styles.reverse]: direction === "column",
                            },
                          )
                        : gradientMode === "kh"
                        ? classNames(
                            isGreatThan6
                              ? styles.ceilKh
                              : isLessThan2
                              ? styles.ceilKh2
                              : middle
                              ? styles.ceil
                              : styles.greaterOff,
                            {
                              [styles.reverse]: direction === "column",
                            },
                          )
                        : gradientMode === "p"
                        ? classNames(
                            isGreatThan6
                              ? styles.ceilP6
                              : isLessThan2
                              ? styles.ceilP2
                              : middle
                              ? styles.ceilP
                              : styles.greaterOff,
                            {
                              [styles.reverse]: direction === "column",
                            },
                          )
                        : gradientMode === "n"
                        ? classNames(
                            isGreatThan6
                              ? styles.ceilN6
                              : isLessThan2
                              ? styles.ceilN2
                              : middle
                              ? styles.ceilN
                              : styles.greaterOff,
                            {
                              [styles.reverse]: direction === "column",
                            },
                          )
                        : gradientMode === "none"
                        ? classNames(hasAnyData ? styles.ceilOff : styles.greaterOff, {
                            [styles.reverse]: direction === "column",
                          })
                        : ""
                    }
                  ></div>
                );
              })}
            </div>
          );
        }).reverse()}
      </>
    );
  },
);

export default HeatmapListUnreverse;
