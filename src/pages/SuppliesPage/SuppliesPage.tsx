import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { DispensersService } from "../../services/DispensersService";
import { MainChartsService } from "../../services/MainChartsService";
import { SuppliesHeader } from "./components/suppliesHeader";
import { SuppliesList } from "./components/suppliesList";
import { Loader } from "../../components/loader";

import styles from "./Supplies.module.scss";
import { AnalysisService } from "../../services/AnalysisService";

const dispensersService = Container.get(DispensersService);
const mainChartsService = Container.get(MainChartsService);
const analysisService = Container.get(AnalysisService);

export const SuppliesPage = observer(() => {
  const getDispensers = dispensersService.getDispensers.bind(dispensersService);
  const getPoints = mainChartsService.getPoints.bind(mainChartsService);
  const dispensersList = dispensersService.dispensersList;
  const getComponents = analysisService.getComponents.bind(analysisService);

  React.useEffect(() => {
    getComponents();
    getDispensers();
    getPoints();
  }, []);

  return (
    <div className={styles.container}>
      {!dispensersList.length ? (
        <div className={styles.loaderContainer}>
          <Loader size="large" />
        </div>
      ) : (
        <>
          <SuppliesHeader />
          <SuppliesList />
        </>
      )}
    </div>
  );
});
