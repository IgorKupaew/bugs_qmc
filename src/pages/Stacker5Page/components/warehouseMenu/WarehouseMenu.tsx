import React from "react";

import WarehouseChemicalCompositionTable from "./WarehouseChemicalCompositionTable";
import WarehouseCurrentValues from "./WarehouseCurrentValues";
import WarehouseMenuKhCorrection from "./WarehouseMenuKhCorrection";
import WarehouseMineralCompositionTable from "./WarehouseMineralCompositionTable";

import styles from "./WarehouseMenu.module.scss";
import Container from "typedi";
import { WarehouseService } from "../../../../services/WarehouseService";
import { observer } from "mobx-react-lite";

const warehouseService = Container.get(WarehouseService);

export const WarehouseMenu = observer(() => {
  const warehouseItems = warehouseService.warehouseItems;

  if (warehouseItems.length === 0) return null;
  return (
    <div className={styles.warehouseMenuWrapper}>
      <div className={styles.warehouseMenu}>
        <WarehouseChemicalCompositionTable />
        <WarehouseCurrentValues />
        <div className={styles.splitLine}></div>
        <WarehouseMineralCompositionTable />
      </div>
      <WarehouseMenuKhCorrection />
    </div>
  );
});
