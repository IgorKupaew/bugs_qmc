import React from "react";

import { Caterpillar } from "./components/caterpillar";
import { ReactComponent as StrokeArrow } from "../../assets/icons/strokeArrow.svg";

import styles from "./Main.module.scss";
import { DispenserList } from "./components/dispenserList";
import { InlineAnalyzer } from "./components/inlineAnalyzer";
import { PlaceSwitcher } from "./components/placeSwitcher";
import { MeasuredCharts } from "./components/measuredCharts";
import Container from "typedi";
import { AnalysisService } from "../../services/AnalysisService";

const analysisService = Container.get(AnalysisService);

export const MainPage = () => {
  const getComponents = analysisService.getComponents.bind(analysisService);
  React.useEffect(() => {
    getComponents();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.firstBlock}>
        <DispenserList />
        <InlineAnalyzer />
        <div className={styles.placeSwitcherBlockMinWidth}>
          <PlaceSwitcher />
        </div>
      </div>
      <div className={styles.secondBlock}>
        <div className={styles.pillarBlock}>
          <div className={styles.pillarBlockLine}>
            <StrokeArrow />
          </div>
          <Caterpillar />
        </div>
        <div className={styles.placeSwitcherBlock}>
          <PlaceSwitcher />
        </div>
      </div>
      <div className={styles.thirdBlock}>
        <MeasuredCharts />
      </div>
    </div>
  );
};
