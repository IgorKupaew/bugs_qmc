import Container from "typedi";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

import WarehouseSwitcher from "./WarehouseSwitcher";
import { InWorkIcon } from "./InWorkIcon";
import { getFormattedDate } from "../../../../helpers/getFormattedDate";
import WarehouseActions from "./WarehouseActions";
import { WarehouseService } from "../../../../services/WarehouseService";

import styles from "./Stacker5Header.module.scss";

const warehouseService = Container.get(WarehouseService);
export const Stacker5Header = observer(() => {
  const currentArchiveId = warehouseService.currentArchiveId;
  const archivedPilesItems = warehouseService.archivedPilesItems;
  const pile = warehouseService.currentPile;
  const currentStackerNumber = warehouseService.currentStackerNumber;

  const data = useMemo(() => {
    if (currentArchiveId) {
      const currentArchivedItem = archivedPilesItems.find((item) => item.id === currentArchiveId);

      if (currentArchivedItem) {
        return {
          stackerIsRun: false,
          creationTime: currentArchivedItem?.creationTime,
          creatorName: currentArchivedItem?.creatorName,
        };
      }
    }

    return {
      stackerIsRun: pile?.stackerIsRun,
      creationTime: pile?.creationTime,
      creatorName: pile?.creatorName,
    };
  }, [currentArchiveId, archivedPilesItems, pile]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTitle}>
        <div className={styles.headerTitleText}>Склад усреднитель №{currentStackerNumber}</div>
        <InWorkIcon isWorking={data?.stackerIsRun || false} />
        <div className={styles.warehouseSwitcherTitleData}>{`Дата создания: ${
          getFormattedDate(data?.creationTime) || "нет данных"
        }`}</div>
        <div className={styles.warehouseSwitcherTitleData}>{`Оператор: ${data?.creatorName || "нет данных"}`}</div>
      </div>
      <div className={styles.headerMenu}>
        <WarehouseSwitcher />
        <WarehouseActions />
      </div>
    </div>
  );
});
