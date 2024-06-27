import React from "react";

import { classNames } from "../../../../helpers/classnames";

import styles from "./Deviations.module.scss";
import Container from "typedi";
import { MainChartsService } from "../../../../services/MainChartsService";

type TPoint = "kh" | "p" | "n";
const pointTypes: TPoint[] = ["kh", "p", "n"];
const mainChartsService = Container.get(MainChartsService);

const ChooseType = () => {
  const chartGradient = mainChartsService.chartGradient;

  const [type, setType] = React.useState(chartGradient);
  const setChartGradientMode = mainChartsService.setChartGradientMode.bind(mainChartsService);

  const setTypeHandler = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setChartGradientMode(e.currentTarget.id as TPoint);
    setType(e.currentTarget.id as TPoint);
  }, []);

  return (
    <div className={styles.chooseTypeContainer}>
      {pointTypes.map((item) => {
        return (
          <div
            onClick={setTypeHandler}
            key={item}
            id={item}
            className={classNames(styles.chooseTypeButton, {
              [styles.current]: type === item,
            })}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default ChooseType;
