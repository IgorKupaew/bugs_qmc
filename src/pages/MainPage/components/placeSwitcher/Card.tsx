import React from "react";

import { InWorkIcon } from "./InWorkIcon";

import styles from "./PlaceSwitcher.module.scss";
import { classNames } from "../../../../helpers/classnames";

interface ICardProps {
  isWorking: boolean;
  Icon: React.FunctionComponent;
  title: string;
  id: string;
  switchHandler: (id: string) => void;
}

export const Card = ({ isWorking, Icon, title, switchHandler, id }: ICardProps) => {
  const switchHandlerCallback = React.useCallback(() => {
    switchHandler(id);
  }, [id, switchHandler]);

  return (
    <div onClick={switchHandlerCallback} className={classNames(styles.card, { [styles.active]: isWorking })}>
      <InWorkIcon isWorking={isWorking} />
      <div className={styles.cardIcon}>
        <Icon />
      </div>
      <div className={styles.cardTitle}>{title}</div>
    </div>
  );
};
