import { observer } from "mobx-react-lite";
import Container from "typedi";

import { generateNumberArray } from "../../helpers/generateNumberArray";
import { IComposition, WarehouseService } from "../../services/WarehouseService";
import { classNames } from "../../helpers/classnames";

import styles from "./Heatmap.module.scss";

import { IGradientThresholds } from "../../types";
import { useStackerData } from "./hooks/useStackerData";

interface IHeatmapListProps {
  endMeter: number;
  startMeter: number;
  direction: "row" | "column";
  numberOfRows: number;
  onClick: (meter: number) => void;
  gradientMode: string;
}

const warehouseService = Container.get(WarehouseService);

const HeatmapListreverse = observer(
  ({ gradientMode, endMeter, startMeter, direction, numberOfRows, onClick }: IHeatmapListProps) => {
    const currentLayer = warehouseService.currentLayer;
    const compositionsInStore = warehouseService.compositions;
    const gradientThresholds: IGradientThresholds = warehouseService.gradientThresholds;
    const pile = warehouseService.currentPile;

    const compositions = compositionsInStore.filter((item) => item.layer === currentLayer);

    const { stackerData: stacker, isStackerExist } = useStackerData();

    return (
      <>
        {generateNumberArray(Math.floor(startMeter / 10), Math.floor(endMeter / 10), 1)
          .map((item) => item)
          .map((rowIndex) => (
            <div
              key={rowIndex}
              id={(rowIndex + 1).toString()}
              onClick={() => onClick(rowIndex * 10)}
              className={classNames(styles.row, {
                [styles.reverse]: direction === "column",
              })}
            >
              {Array.from({ length: numberOfRows }, (_, colIndex) => {
                let current = compositions.find((item) => item.meter_group === rowIndex * 10 && item.row === colIndex);

                let value = current ? current[gradientMode as keyof IComposition] : null;

                const hasAnyData = current?.kh || current?.p || current?.n;

                const isGreatThan6 =
                  value !== null &&
                  ((gradientMode === "kh" && value > gradientThresholds.khThreshold2) ||
                    (gradientMode === "p" && value > gradientThresholds.pThreshold2) ||
                    (gradientMode === "n" && value > gradientThresholds.nThreshold2));

                const isLessThan2 =
                  value !== null &&
                  ((gradientMode === "kh" && value <= gradientThresholds.khThreshold1) ||
                    (gradientMode === "p" && value <= gradientThresholds.pThreshold1) ||
                    (gradientMode === "n" && value <= gradientThresholds.nThreshold1));

                const middle =
                  value !== null &&
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
                    data-colIndex={colIndex}
                    data-rowIndex={rowIndex}
                    id={(colIndex + 1).toString()}
                    className={
                      (rowIndex * 10 === stacker.meter ||
                        (rowIndex * 10 < stacker.meter && rowIndex * 10 > stacker.meter - 10)) &&
                      colIndex + 1 === stacker.row &&
                      currentLayer === stacker.layer &&
                      isStackerExist
                        ? classNames(styles.stacker, {
                            [styles.reverse]: direction === "column",
                            [styles.disabled]: !pile?.stackerIsRun,
                          })
                        : (rowIndex * 10 > stacker.meter && colIndex + 1 > stacker.row) ||
                          (rowIndex * 10 > stacker.meter && colIndex + 1 > stacker.row - 1) ||
                          colIndex + 1 > stacker.row ||
                          (currentLayer || 0) > stacker.layer
                        ? classNames(
                            (currentLayer || 0) < stacker.layer
                              ? isGreatThan6
                                ? styles[
                                    gradientMode === "kh"
                                      ? "ceilKh"
                                      : gradientMode === "p"
                                      ? "ceilP"
                                      : gradientMode === "n"
                                      ? "ceilN"
                                      : ""
                                  ]
                                : isLessThan2
                                ? styles[
                                    gradientMode === "kh"
                                      ? "ceilKh2"
                                      : gradientMode === "p"
                                      ? "ceilP2"
                                      : gradientMode === "n"
                                      ? "ceilN2"
                                      : ""
                                  ]
                                : middle
                                ? styles[
                                    gradientMode === "kh"
                                      ? "ceilKh"
                                      : gradientMode === "p"
                                      ? "ceilP"
                                      : gradientMode === "n"
                                      ? "ceilN"
                                      : ""
                                  ]
                                : gradientMode === "kh"
                                ? styles.greaterOff
                                : gradientMode === "p"
                                ? styles.greaterOff
                                : gradientMode === "n"
                                ? styles.greaterOff
                                : gradientMode === "none"
                                ? hasAnyData
                                  ? styles.ceilOff
                                  : styles.greaterOff
                                : ""
                              : gradientMode === "kh"
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
                              : gradientMode === "kh"
                              ? styles.greaterOff
                              : "",
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
                              : gradientMode === "p"
                              ? styles.greaterOff
                              : "",
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
                              : gradientMode === "n"
                              ? styles.greaterOff
                              : "",
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
              }).reverse()}
            </div>
          ))}
      </>
    );
  },
);

export default HeatmapListreverse;
