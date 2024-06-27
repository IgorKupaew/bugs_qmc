import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { CurrentPersonService } from "../../../../services/CurrentPersonService";
import { WarehouseService } from "../../../../services/WarehouseService";

import { ReactComponent as CrossIcon } from "../../../../assets/icons/primary3Cross.svg";
import { ReactComponent as RemoveIcon } from "../../../../assets/icons/remove.svg";

import styles from "./Stacker5Header.module.scss";

const warehouseService = Container.get(WarehouseService);
const currentPersonService = Container.get(CurrentPersonService);

const WarehouseOptionalActions = observer(() => {
  const isLoading = warehouseService.isLoading;
  const warehouseItems = warehouseService.warehouseItems;
  const currentStackerNumber = warehouseService.currentStackerNumber;

  const removeWarehouse = warehouseService.removeWarehouse.bind(warehouseService);
  const createWarehouse = warehouseService.createWarehouse.bind(warehouseService);
  const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);

  const removeWarehouseHandler = () => {
    openModalWithAction(removeWarehouse, "Удаление склада");
  };
  const createWarehouseHandler = () => {
    openModalWithAction(() => createWarehouse(), "Создание склада");
  };

  if (warehouseItems.length < 2) {
    return (
      <div onClick={!isLoading ? createWarehouseHandler : undefined} className={styles.warehouseActionsAdd}>
        <CrossIcon />
        Добавить склад к №{currentStackerNumber}
      </div>
    );
  }

  return (
    <div onClick={!isLoading ? removeWarehouseHandler : undefined} className={styles.warehouseActionsAdd}>
      <RemoveIcon />
      Удалить Склад
    </div>
  );
});

export default WarehouseOptionalActions;
