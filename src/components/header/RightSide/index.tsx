import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { switchButtonsHeaderItems } from "../config";
import { MainChartsService } from "../../../services/MainChartsService";

import Notifications from "./NotificationsButton";
import Settings from "./SettingsButton";
import ButtonsSwitchMenu from "../../buttonsSwitchMenu";
import { Loader } from "../../loader";

import styles from "../header.module.scss";

const mainChartsService = Container.get(MainChartsService);

const LeftSide = observer(() => {
  const setWorkMode = mainChartsService.setAutoMode.bind(mainChartsService);

  const points = mainChartsService.points;

  const mode = React.useMemo(() => {
    if (points) {
      return points.autoMode ? "auto" : "handle";
    }
  }, [points]);

  return (
    <div className={styles.leftSide}>
      <div className={styles.switchButtonsContainer}>
        <div className={styles.workMode}>
          <span className={styles.switchButtonsLabel}>Режим работы QMC</span>
          <div className={styles.switchButtons}>
            {points ? (
              <ButtonsSwitchMenu onClick={setWorkMode} selectedKey={mode!} items={switchButtonsHeaderItems} />
            ) : (
              <div className={styles.loaderContainer}>
                <Loader size="small" />
              </div>
            )}
          </div>
        </div>

        <div className={styles.utilitiesButtons}>
          <Notifications isMarked={true} />
          <Settings />
        </div>
      </div>
    </div>
  );
});

export default LeftSide;
