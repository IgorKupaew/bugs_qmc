import React from "react";
import { observer } from "mobx-react-lite";
import Container from "typedi";

import { ReactComponent as ArrowLeft } from "../../../../assets/icons/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../../../assets/icons/arrowRight.svg";

import { MainChartsService } from "../../../../services/MainChartsService";

import styles from "./MeasuredCharts.module.scss";

interface IButtons {
  type: string;
}

const mainChartsService = Container.get(MainChartsService);

const ChartsItemButtons = observer(({ type }: IButtons) => {
  const numberPlus = mainChartsService.setSpliceNumberPlus.bind(mainChartsService);
  const numberMinus = mainChartsService.setSpliceNumberMinus.bind(mainChartsService);

  const Plus = React.useCallback(() => {
    numberPlus(type);
  }, [type]);

  const Minus = React.useCallback(() => {
    numberMinus(type);
  }, [type]);

  return (
    <div className={styles.buttonsContainer}>
      <div onClick={Minus} className={styles.buttonItem}>
        <ArrowLeft />
      </div>
      <div onClick={Plus} className={styles.buttonItem}>
        <ArrowRight />
      </div>
    </div>
  );
});

export default ChartsItemButtons;
