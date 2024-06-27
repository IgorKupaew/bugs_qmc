import React from "react";

import styles from "./Heatmap.module.scss";

import type { TValues } from "./Heatmap";

interface ILeftLineRowProps {
  endMeter: number;
  startMeter: number;
  bottomValue: TValues;
}

const BottomLineRow = ({ endMeter, bottomValue, startMeter }: ILeftLineRowProps) => {
  const [arrayOfMeter, setArrayOfMeter] = React.useState<number[]>([]);

  React.useEffect(() => {
    const arr = [];
    for (let i = startMeter; i <= endMeter; i++) {
      arr.push(i);
    }
    setArrayOfMeter(arr);
  }, [endMeter, startMeter]);

  if (bottomValue !== "Метры") {
    return (
      <div style={{ flex: "0 0 120.4px" }} className={styles.bottomRow}>
        {arrayOfMeter.map((number) => {
          if (number === 0) return <div className={styles.leftRowValue}>1</div>;
          return number % 4 === 0 ? <div className={styles.leftRowValue}>{number}</div> : null;
        })}
      </div>
    );
  }

  return (
    <div className={styles.bottomRow}>
      {arrayOfMeter.map((number) => {
        return number % 10 === 0 ? <div className={styles.leftRowValue}>{number}</div> : null;
      })}
    </div>
  );
};

export default BottomLineRow;
