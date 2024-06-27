import React, { useRef, useState } from "react";
import Modal from "antd/lib/modal/Modal";

import NotificationItem from "./NotificationItem";
import { Loader } from "../loader";
import { Empty } from "../empty";

import { fixNotificationsModalPosition } from "./helper";

import styles from "./notifications.module.scss";

import { getNotifications } from "../../api/notifications";

export interface INotificationItem {
  id: string;
  message: string;
  ts: string;
}

interface INotificationsPanelProps {
  isModalOpen: boolean;
  modalToggleHandler: () => void;
}

export const NotificationsPanel = ({ isModalOpen, modalToggleHandler }: INotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = useRef(1);

  const scrollHandler = (e: any) => {
    const scrollTop = e.currentTarget.scrollTop;

    if (scrollTop > currentPage.current * 5000 && !isLoading) {
      setIsLoading(true);
      currentPage.current = currentPage.current + 1;
      getNotifications(currentPage.current).then(({ data }: any) => {
        setNotifications((prev) => [...prev, ...data]);
        setIsLoading(false);
      });
    }
  };

  React.useEffect(() => {
    fixNotificationsModalPosition(isModalOpen);

    const modal = document.querySelector(".notificationModal .ant-modal-content");
    modal && modal.addEventListener("scroll", scrollHandler);

    return () => (modal ? modal.removeEventListener("scroll", scrollHandler) : undefined);
  }, [isModalOpen]);

  React.useEffect(() => {
    let ignore = false;

    if (isModalOpen) {
      setIsLoading(true);
      getNotifications(1)
        .then(({ data }: any) => {
          if (ignore) return;

          setNotifications(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [isModalOpen]);

  return (
    <Modal
      width={419}
      className="notificationModal"
      title={<div className={styles.notificationsTitleText}>Уведомления</div>}
      footer={null}
      open={isModalOpen}
      onCancel={modalToggleHandler}
    >
      {isLoading && !notifications.length && (
        <div style={{ marginBottom: 50 }}>
          <Loader />
        </div>
      )}
      {!isLoading &&
        notifications.length !== 0 &&
        notifications.map((item: INotificationItem) => {
          return (
            <NotificationItem
              key={item.id}
              status={1}
              date={new Date(item.ts).toLocaleDateString()}
              time={new Date(item.ts).toLocaleTimeString()}
              body={item.message}
            />
          );
        })}
      {!isLoading && notifications.length === 0 && (
        <div style={{ marginBottom: 50 }}>
          <Empty />
        </div>
      )}
    </Modal>
  );
};
