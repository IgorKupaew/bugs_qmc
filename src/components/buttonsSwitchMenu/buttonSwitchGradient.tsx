import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { classNames } from "../../helpers/classnames";

import styles from "./buttonSwitchMenu.module.scss";
import { MainChartsService } from "../../services/MainChartsService";

interface ISwitchButtonMenuItem {
  label: string;
  icon: JSX.Element;
  key: string;
}

interface IButtonsSwitchMenu {
  items: ISwitchButtonMenuItem[];
  selectedKey: string;
  direction: "row" | "column";
}

const mainChartsService = Container.get(MainChartsService);

const ButtonsSwitchGradient = observer(({ selectedKey, items, direction }: IButtonsSwitchMenu) => {
  const setUpperGradientMode = mainChartsService.setUpperGradientMode.bind(mainChartsService);
  const setSliceGradientMode = mainChartsService.setSliceGradientMode.bind(mainChartsService);

  const handleUpperButtonClick = React.useCallback(
    (index: string) => {
      setUpperGradientMode(index);
    },
    [setUpperGradientMode],
  );

  const handleSliceButtonClick = React.useCallback(
    (index: string) => {
      setSliceGradientMode(index);
    },
    [setSliceGradientMode],
  );

  return (
    <div className={styles.switchButtonsContainer}>
      {items.map((item) => {
        return (
          <button
            onClick={
              direction === "column" ? () => handleSliceButtonClick(item.key) : () => handleUpperButtonClick(item.key)
            }
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

export default ButtonsSwitchGradient;
