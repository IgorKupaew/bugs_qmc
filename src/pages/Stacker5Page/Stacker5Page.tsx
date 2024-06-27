import React from "react";
import { useLocation } from "react-router-dom";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { MainChartsService } from "../../services/MainChartsService";
import { WarehouseService } from "../../services/WarehouseService";
import { roundTo10 } from "../../helpers/roundTo10";
import { useInterval } from "../../hooks/useInterval";

import { Loader } from "../../components/loader";
import { Stacker5Header } from "./components/stacker5Header";
import { WarehouseMenu } from "./components/warehouseMenu";
import { Heatmap } from "../../components/heatmap";
import { Deviations } from "./components/deviations";
import { NoData } from "./components/NoData";

import styles from "./Stacker5.module.scss";

const mainChartsService = Container.get(MainChartsService);
const warehouseService = Container.get(WarehouseService);

export const Stacker5Page = observer(() => {
  const getPoints = mainChartsService.getPoints.bind(mainChartsService);
  const getWareHouseItems = warehouseService.getWareHouseItems.bind(warehouseService);
  const getPiles = warehouseService.getPiles.bind(warehouseService);
  const setCurrentPile = warehouseService.setCurrentPile.bind(warehouseService);
  const getComposition = warehouseService.getComposition.bind(warehouseService);
  const getAggregatedComposition = warehouseService.getAggregatedComposition.bind(warehouseService);
  const getGradientThresholds = warehouseService.getGradientThresholds.bind(warehouseService);
  const currentWarehouse = warehouseService.currentWarehouse;
  const currentStackerNumber = warehouseService.currentStackerNumber;
  const getIndexes = warehouseService.getIndexes.bind(warehouseService);
  const setCurrentStackerNumber = warehouseService.setCurrentStackerNumber.bind(warehouseService);
  const currentLayer = warehouseService.currentLayer;
  const currentArchiveId = warehouseService.currentArchiveId;

  let { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname) {
      setCurrentStackerNumber(+pathname[pathname.length - 1]);
    }
  }, [pathname]);

  const currentPile = warehouseService.currentPile;
  const isLoading = warehouseService.isLoading;

  const fetchCompositionAndIndexes = React.useCallback(() => {
    getComposition({});
    getAggregatedComposition({ layer: currentLayer ? currentLayer : undefined });
    getIndexes();
  }, [currentLayer, currentArchiveId]);

  const { reset } = useInterval(async () => fetchCompositionAndIndexes(), 60 * 1000);

  React.useEffect(() => {
    reset();
  }, [currentLayer, currentArchiveId]);

  React.useEffect(() => {
    fetchCompositionAndIndexes();
  }, [currentArchiveId]);

  React.useEffect(() => {
    const initialFetch = async () => {
      await getPoints();
      await getWareHouseItems();
      await fetchCompositionAndIndexes();
      await getGradientThresholds();
    };
    initialFetch().then(() => {
      setCurrentPile();
    });
  }, [currentStackerNumber]);

  React.useEffect(() => {
    getPiles().then(() => {
      setCurrentPile();
    });
  }, [currentWarehouse, currentStackerNumber]);

  React.useEffect(() => {
    getWareHouseItems();
  }, [currentStackerNumber]);

  if (!currentPile && isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader size="large" />
      </div>
    );
  }

  if (!currentPile) {
    return (
      <div className={styles.container}>
        <Stacker5Header />
        <NoData />
        <div className={styles.heatmapsContainer}>
          <div>
            <div className={styles.heatmapWrapper}>
              <WarehouseMenu />
            </div>
          </div>
          <div>
            <div className={styles.heatmapWrapper}>
              <Deviations />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Stacker5Header />
      <div className={styles.heatmapsContainer}>
        <div className={styles.heatmapFlex}>
          <div className={styles.heatmapWrapper}>
            <Heatmap
              showGradient={false}
              showButton={true}
              title="Вид сверху"
              direction="row"
              numberOfRows={roundTo10(currentWarehouse.numberOfRows)}
              startMeter={roundTo10(currentWarehouse.startMeter)}
              endMeter={roundTo10(currentWarehouse.endMeter)}
              leftValue="Ряды"
              bottomValue="Метры"
              onClick={console.log}
            />
            <WarehouseMenu />
          </div>
        </div>
        <div className={styles.heatmapFlex}>
          <div className={styles.heatmapWrapper}>
            <Heatmap
              startMeter={0}
              showGradient={true}
              showButton={false}
              onClick={fetchCompositionAndIndexes}
              title="Поперечный срез"
              direction="column"
              numberOfRows={roundTo10(currentWarehouse.numberOfRows)}
              endMeter={13} // roundTo10(currentPile.numberOfLayers)
              leftValue="Слои"
              bottomValue="Ряды"
            />
            <Deviations />
          </div>
        </div>
      </div>
    </div>
  );
});
