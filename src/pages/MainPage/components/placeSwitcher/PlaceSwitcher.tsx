import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { MainChartsService } from "../../../../services/MainChartsService";
import { CurrentPersonService } from "../../../../services/CurrentPersonService";

import { Card } from "./Card";

import styles from "./PlaceSwitcher.module.scss";

const mainChartsService = Container.get(MainChartsService);
const currentPersonService = Container.get(CurrentPersonService);

export const PlaceSwitcher = observer(() => {
  const switchActiveDirect = mainChartsService.switchActiveDirect.bind(mainChartsService);
  const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);
  const setDirect = mainChartsService.setDirect.bind(mainChartsService);
  const currentDirect = mainChartsService.points?.isDirectMode;
  const placeSwitcherCardsData = mainChartsService.cards;

  const switchHandler = React.useCallback(
    async (id: string) => {
      await openModalWithAction(() => {
        switchActiveDirect(id);
        setDirect();
      }, `Установка направления id: ${id}`);
    },
    [openModalWithAction, setDirect, switchActiveDirect],
  );

  return (
    <div className={styles.placeSwitcherContainer}>
      {placeSwitcherCardsData.map((card, index) => {
        let isCurrent: boolean | undefined;
        if ((currentDirect === false && index === 0) || (currentDirect === true && index === 1)) {
          isCurrent = true;
        }
        return (
          <Card
            id={card.id}
            switchHandler={switchHandler}
            key={card.id}
            isWorking={isCurrent || false}
            Icon={card.Icon}
            title={card.title}
          />
        );
      })}
    </div>
  );
});
