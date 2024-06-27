import React from "react";

import styles from "./Empty.module.scss";

export const Empty = () => {
  return (
    <div className={styles.empty}>
      <span className={styles.emptyText}>Нет данных</span>
    </div>
  );
};
