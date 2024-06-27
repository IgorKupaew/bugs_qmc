import { ReactComponent as GreenDotIcon } from "../../../../assets/icons/greenDot.svg";
import { classNames } from "../../../../helpers/classnames";

import styles from "./PlaceSwitcher.module.scss";

export const InWorkIcon = ({ isWorking }: { isWorking: boolean }) => (
  <div className={classNames(styles.inWorkIcon, { [styles.opacity]: !isWorking })}>
    <GreenDotIcon />
    <div className={styles.inWorkTitle}>В работе</div>
  </div>
);
