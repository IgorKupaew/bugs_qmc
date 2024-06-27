import React from "react";
import styles from "./AnalysisTableHeader.module.scss";

const AnalysisTableHeader = () => {
  return (
    <div className={styles.HeaderTable}>
      <div className={styles.HeaderDutyNameItem}>ФИО</div>
      <div className={styles.HeaderDate}>Дата</div>
      <div className={styles.stuff}>Материал</div>
      <div className={styles.HeaderElement}>
        <span className={styles.HeaderElementItem}>SiO2</span>
        <span className={styles.HeaderElementItem}>Al2O3</span>
        <span className={styles.HeaderElementItem}>Fe2O3</span>
        <span className={styles.HeaderElementItem}>CaO</span>
        <span className={styles.HeaderElementItem}>MgO</span>
        <span className={styles.HeaderElementItem}>TiO3</span>
        <span className={styles.HeaderElementItem}>CL</span>
        <span className={styles.HeaderElementItem}>SO3</span>
        <span className={styles.HeaderElementItem}>K2O</span>
        <span className={styles.HeaderElementItem}>Na2O</span>
      </div>
    </div>
  );
};

export default AnalysisTableHeader;
