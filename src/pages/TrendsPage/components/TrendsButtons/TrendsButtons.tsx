import { MouseEventHandler } from "react";

import { ReactComponent as ArrowLeft } from "../../../../assets/icons/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../../../assets/icons/arrowRight.svg";

import styles from "./TrendsButtons.module.scss";

interface IProps {
  onLeftClick: MouseEventHandler;
  onRightClick: MouseEventHandler;
}

export const TrendsButtons = ({ onLeftClick, onRightClick }: IProps) => {
  return (
    <div className={styles.buttonsContainer}>
      <div onClick={onLeftClick} className={styles.buttonItem}>
        <ArrowLeft />
      </div>
      <div onClick={onRightClick} className={styles.buttonItem}>
        <ArrowRight />
      </div>
    </div>
  );
};
