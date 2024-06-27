import React from "react";
import Container from "typedi";

import { WarehouseService } from "../../../../services/WarehouseService";
import { IGradientThresholds } from "../../../../types";

import styles from "../../../../components/heatmap/Heatmap.module.scss";

interface IRange {
  gradient: string;
}

const warehouseService = Container.get(WarehouseService);

const Range = ({ gradient }: IRange) => {
  const gradientThresholds: IGradientThresholds = warehouseService.gradientThresholds;
  return (
    <div>
      {gradient === "kh" ? (
        <div className={styles.range}>
          <div className={styles.range_partKh1}></div>
          <div className={styles.range_partKh2}></div>
          <div className={styles.range_partKh3}></div>
        </div>
      ) : gradient === "p" ? (
        <div className={styles.range}>
          <div className={styles.range_partP1}></div>
          <div className={styles.range_partP2}></div>
          <div className={styles.range_partP3}></div>
        </div>
      ) : gradient === "n" ? (
        <div className={styles.range}>
          <div className={styles.range_partN1}></div>
          <div className={styles.range_partN2}></div>
          <div className={styles.range_partN3}></div>
        </div>
      ) : null}
      <div className={styles.range_numbers}>
        <span>0</span>
        <span>
          {" "}
          {gradient === "kh"
            ? gradientThresholds.khThreshold1
            : gradient === "p"
            ? gradientThresholds.pThreshold1
            : gradient === "n"
            ? gradientThresholds.nThreshold1
            : null}
        </span>
        <span>
          {gradient === "kh"
            ? gradientThresholds.khThreshold2
            : gradient === "p"
            ? gradientThresholds.pThreshold2
            : gradient === "n"
            ? gradientThresholds.nThreshold2
            : null}
        </span>
        <span>10</span>
      </div>
    </div>
  );
};

export default Range;
