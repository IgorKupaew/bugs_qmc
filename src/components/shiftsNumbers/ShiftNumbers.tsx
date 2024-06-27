import React from "react";
import { observer } from "mobx-react-lite";

import Container from "typedi";

import { AnalysisService } from "../../services/AnalysisService";

import styles from "./shiftNumbers.module.scss";
import { classNames } from "../../helpers/classnames";

const analysisService = Container.get(AnalysisService);

const ShiftsNumbers = observer(() => {
  const shiftToOne = analysisService.shiftToOne.bind(analysisService);
  const shiftToTwo = analysisService.shiftToTwo.bind(analysisService);
  const currentShift = analysisService.shiftComponent.isFirstShift;
  const isLoading = analysisService.isLoading;

  return (
    <div className={styles.shiftSwitcher}>
      <div className={styles.shiftSwitcherTitle}>Смена</div>
      <div className={styles.shiftSwitcherList}>
        <button
          disabled={isLoading}
          onClick={shiftToOne}
          className={classNames(isLoading ? styles.shiftSwitcherItemLoading : styles.shiftSwitcherItem, {
            [styles.active]: currentShift,
          })}
        >
          {1}
        </button>
        <button
          disabled={isLoading}
          onClick={shiftToTwo}
          className={classNames(isLoading ? styles.shiftSwitcherItemLoading : styles.shiftSwitcherItem, {
            [styles.active]: !currentShift,
          })}
        >
          {2}
        </button>
      </div>
    </div>
  );
});

export default ShiftsNumbers;
