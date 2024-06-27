import { ReactComponent as GreenDotIcon } from "../../../../assets/icons/greenDot.svg";

import { classNames } from "../../../../helpers/classnames";

import styles from "./Stacker5Header.module.scss";

export const InWorkIcon = ({ isWorking }: { isWorking: boolean }) => (
  <div
    className={classNames(styles.workTitle, {
      [styles.workTitleOn]: isWorking,
      [styles.workTitleOff]: !isWorking,
    })}
  >
    {isWorking && <GreenDotIcon />}
    <div>{isWorking ? "В работе" : "Остановлен"}</div>
  </div>
);
