import { Button, Popover, Table, notification } from "antd";
import Container from "typedi";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { WarehouseService } from "../../../../services/WarehouseService";

import { getFormattedDate } from "../../../../helpers/getFormattedDate";

import styles from "./PilesList.module.scss";

import type { IArchivedPile } from "../../../../types";

const TITLE_TEXT = "Архив склада";

const warehouseService = Container.get(WarehouseService);

interface ITableArchiveItem extends IArchivedPile {
  key: string;
  isCurrent?: boolean;
}

export const PilesList = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);

  const [api, contextHolder] = notification.useNotification();

  const getArchivedPiles = warehouseService.getArchivedPiles.bind(warehouseService);
  const setCurrentArchiveId = warehouseService.setCurrentArchiveId.bind(warehouseService);
  const currentWarehouse = warehouseService.currentWarehouse;
  const currentStackerNumber = warehouseService.currentStackerNumber;

  const isArchivedError = warehouseService.isArchivedError;
  const isArchivedLoading = warehouseService.isArchivedLoading;
  const currentArchiveId = warehouseService.currentArchiveId;

  const piles = warehouseService.archivedPilesItems;
  const currentPile = warehouseService.currentPile;

  const pilesList: ITableArchiveItem[] = piles.map((item) => ({
    ...item,
    key: item.id,
    creatorName: item.creatorName ?? "-",
  }));

  const current: ITableArchiveItem = {
    creationTime: currentPile?.creationTime || "",
    creatorName: currentPile?.creatorName?.trim() || "-",
    finishDate: currentPile?.finishDate || "-",
    id: currentPile?.id || "",
    isFull: currentPile?.isFull || true,
    key: currentPile?.id || `${Date.now()}`,
    isCurrent: true,
  };

  pilesList.unshift(current);

  const columns = [
    {
      title: <div className={styles.columnTitle}>Дата создания</div>,
      dataIndex: "creationTime",
      key: "creationTime",
      render: (date: string) => <div className={styles.columnItem}>{getFormattedDate(date)}</div>,
    },
    {
      title: <div className={styles.columnTitle}>Имя оператора</div>,
      dataIndex: "creatorName",
      key: "creatorName",
      render: (creatorName: string) => <div className={styles.columnItem}>{creatorName}</div>,
    },
    {
      title: <div className={styles.columnTitle}>Статус</div>,
      dataIndex: "isCurrent",
      key: "isCurrent",
      render: (isCurrent: boolean) => <div className={styles.columnItem}>{isCurrent ? "Текущий" : "-"}</div>,
    },
  ];

  const showError = (message: JSX.Element | string, description: JSX.Element | string) => {
    api.open({
      placement: "topRight",
      type: "error",
      message,
      description,
    });
  };

  const showSuccess = (message: JSX.Element | string, description: JSX.Element | string) => {
    api.open({
      placement: "topRight",
      type: "success",
      message,
      description,
    });
  };

  useEffect(() => {
    getArchivedPiles(1);
    setPageNumber(1);
    setCurrentArchiveId(null);
  }, [currentStackerNumber, currentWarehouse]);

  useEffect(() => {
    getArchivedPiles(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (!currentArchiveId) return;

    if (!isArchivedLoading && isArchivedError) {
      showError(
        "Данные в архиве не найдены",
        <div>
          ID кучи: <span style={{ fontSize: 10, fontWeight: 700 }}>{currentArchiveId}</span>
        </div>,
      );
    }

    if (!isArchivedLoading && !isArchivedError) {
      showSuccess(
        "Данные в архиве найдены",
        <div>
          ID кучи: <span style={{ fontSize: 10, fontWeight: 700 }}>{currentArchiveId}</span>
        </div>,
      );
    }
  }, [isArchivedError, isArchivedLoading]);

  return (
    <div>
      {contextHolder}
      <Popover
        content={
          <div>
            <Table
              bordered
              pagination={{ position: ["bottomCenter"] }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (record.isCurrent) {
                      setCurrentArchiveId(null);

                      return;
                    }

                    setCurrentArchiveId(record.id);
                  },
                };
              }}
              dataSource={pilesList}
              columns={columns}
            />
          </div>
        }
        title={TITLE_TEXT}
        trigger="click"
      >
        <Button style={{ marginRight: 15 }}>{TITLE_TEXT}</Button>
      </Popover>
      <Button onClick={() => setCurrentArchiveId(null)}>Текущий склад</Button>
    </div>
  );
});
