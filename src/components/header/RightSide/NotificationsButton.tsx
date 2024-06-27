import React from "react";

import { NotificationsPanel } from "../../notificationsPanel";

import BellIcon from "../../../assets/icons/Bell";
import BellCircleIcon from "../../../assets/icons/BellCircle";

import styles from "../header.module.scss";

interface INotificationsProps {
  isMarked: boolean;
}

const Notifications = ({ isMarked }: INotificationsProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const modalToggleHandler = React.useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <>
      <NotificationsPanel modalToggleHandler={modalToggleHandler} isModalOpen={isModalOpen} />
      <div onClick={modalToggleHandler} className={styles.bellContainer}>
        <BellIcon />
        {isMarked && (
          <div className={styles.bellCircleContainer}>
            <BellCircleIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;
