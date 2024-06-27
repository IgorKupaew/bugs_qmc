import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { CustomSlider } from "../../../../components/slider";
import { SaveButtons } from "../../../../components/saveButtons";

import { DispensersService } from "../../../../services/DispensersService";
import { CurrentPersonService } from "../../../../services/CurrentPersonService";
import { MainChartsService } from "../../../../services/MainChartsService";

import styles from "./SuppliesHeader.module.scss";

const dispensersService = Container.get(DispensersService);
const currentPersonService = Container.get(CurrentPersonService);
const mainChartsService = Container.get(MainChartsService);

export const SuppliesHeader = observer(() => {
  const setSupplies = dispensersService.setSupplies.bind(dispensersService);
  const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);
  const getDispensers = dispensersService.getDispensers.bind(dispensersService);

  const getPoints = mainChartsService.getPoints.bind(mainChartsService);

  const clearDispenserList = dispensersService.clearDispenserList.bind(dispensersService);

  const points = mainChartsService.points;

  const setSuppliesHandler = React.useCallback(() => {
    openModalWithAction(setSupplies, "Установка питателей");
  }, [setSupplies, openModalWithAction]);

  const onCancelHandler = React.useCallback(() => {
    clearDispenserList();
    getDispensers();
    getPoints();
  }, [getDispensers, getPoints, clearDispenserList]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Настройка питателей</div>
      <div className={styles.pointsConfigurator}>
        {/* <div className={styles.sliders}>
          <div className={styles.slidersLabel}>Приоритеты</div>
          <div className={styles.slidersContainer}>
            <CustomSlider id={"khPriority"} label="KH" min={0} max={3} value={points?.khPriority} />
            <CustomSlider id={"pPriority"} label="p" min={0} max={3} value={points?.pPriority} />
            <CustomSlider id={"nPriority"} label="n" min={0} max={3} value={points?.nPriority} />
          </div>
        </div> */}
        <div className={styles.slidersContainer}>
          <SaveButtons onSave={setSuppliesHandler} onCancel={onCancelHandler} />
        </div>
      </div>
    </div>
  );
});
