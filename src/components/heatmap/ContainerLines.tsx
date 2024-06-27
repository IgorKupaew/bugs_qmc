import React from "react";

import { ReactComponent as ArrowIcon } from "../../assets/icons/warehouseArrow.svg";
import { ReactComponent as SecondArrowIcon } from "../../assets/icons/warehouseArrowSecond.svg";

import styles from "./Heatmap.module.scss";

interface IContainersLinesProps {
  leftValue: string;
  bottomValue: string;
}

const ContainerLines = ({ leftValue, bottomValue }: IContainersLinesProps) => {
  return (
    <>
      <div className={styles.containerBottomLine}>
        <div className={styles.containerBottomLineFirst}></div>
        <div className={styles.containerBottomLineSecond}>{bottomValue}</div>
        <div className={styles.containerBottomLineThird}>
          <ArrowIcon />
        </div>
      </div>
      <div className={styles.containerLeftLine}>
        <div className={styles.containerLeftLineFirst}>
          <SecondArrowIcon />
        </div>
        <div className={styles.containerLeftLineSecond}>{leftValue}</div>
        <div className={styles.containerLeftLineThird}></div>
      </div>
    </>
  );
};

export default ContainerLines;
