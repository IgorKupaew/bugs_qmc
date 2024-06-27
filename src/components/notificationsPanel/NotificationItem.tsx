import React from "react";

import { statusColors } from "./helper";

import styles from "./notifications.module.scss";

import type { NotificationsItem } from "../../services/NotificationsService";

type INotificationsItemProps = Omit<NotificationsItem, "id">;

const NotificationItem = ({ body, status, date, time }: INotificationsItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemContainer}>
        <div className={styles.indicator} style={{ background: statusColors[status] }}></div>
        <div className={styles.content}>
          <div className={styles.timeInfo}>
            <span>{`${date} ${time}`}</span>
          </div>
          <div className={styles.body}>{body}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
