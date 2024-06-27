import React from "react";

import styles from "./LegendItem.module.scss";

interface ILegendItemProps {
  color: `#${string}` | `rgb(${string})` | `rgba(${string})`;
  value?: string | number | JSX.Element;
  label?: string | number | JSX.Element;
}

export const LegendItem = ({ color, value, label }: ILegendItemProps) => {
  return (
    <div className={styles.legendContainer}>
      <div style={{ background: color }} className={styles.legendValue}>
        {value || null}
      </div>
      <div className={styles.legendLabel}>{label || null}</div>
    </div>
  );
};
