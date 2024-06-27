import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { classNames } from "../../helpers/classnames";
import { TWorkModes } from "../header/config";
import { CurrentPersonService } from "../../services/CurrentPersonService";

import styles from "./buttonSwitchMenu.module.scss";
import { MainChartsService } from "../../services/MainChartsService";

interface ISwitchButtonMenuItem {
  label: string;
  icon: JSX.Element;
  key: string;
}

interface IButtonsSwitchMenu {
  onClick: (value: "true" | "false") => Promise<void>;
  selectedKey: string;
  items: ISwitchButtonMenuItem[];
}

const currentPersonService = Container.get(CurrentPersonService);
const mainChartsService = Container.get(MainChartsService);

const ButtonsSwitchMenu = observer(({ onClick, selectedKey, items }: IButtonsSwitchMenu) => {
  const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);
  const getPoints = mainChartsService.getPoints.bind(mainChartsService);

  const onClickHandler = React.useCallback(
    (e: React.MouseEvent) => {
      const argument = ((e.currentTarget as Element).id as TWorkModes) === "auto" ? "true" : "false";
      openModalWithAction(async () => {
        await onClick(argument);
        await getPoints();
      }, `Изменен режим работы QMC. Входящие данные: ${argument}`);
    },
    [onClick, openModalWithAction],
  );

  return (
    <div className={styles.switchButtonsContainer}>
      {items.map((item) => {
        return (
          <button
            onClick={onClickHandler}
            className={classNames(styles.button, {
              [styles.active]: item.key === selectedKey,
            })}
            id={item.key}
            key={item.key}
          >
            {item.icon}
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default ButtonsSwitchMenu;
