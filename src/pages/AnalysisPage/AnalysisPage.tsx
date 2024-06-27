import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { AnalysisService } from "../../services/AnalysisService";
import { MainChartsService } from "../../services/MainChartsService";

import { Header } from "./components/header";
import { Loader } from "../../components/loader";
import { AnalysisTableItem } from "./components/analysisTableItem";
import AnalysisTableHeader from "./components/analisysTableHeader/AnalysisTableHeader";

import styles from "./Analysis.module.scss";

const mainChartsService = Container.get(MainChartsService);
const analysisService = Container.get(AnalysisService);

export const AnalysisPage = observer(() => {
  const getPoints = mainChartsService.getPoints.bind(mainChartsService);
  const getComponents = analysisService.getComponents.bind(analysisService);
  const clearComponents = analysisService.clearComponents.bind(analysisService);

  const componentsDict = analysisService.componentsDict;
  const components = analysisService.components;

  const dates = Object.keys(componentsDict);

  React.useEffect(() => {
    clearComponents();
    getPoints();
    getComponents();
  }, []);

  if (!components.length) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loaderContainer}>
          <Loader size="large" />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerMain}>
        <AnalysisTableHeader />
        {dates.map((date) => {
          return <AnalysisTableItem key={date} date={date} />;
        })}
      </div>
    </div>
  );
});
