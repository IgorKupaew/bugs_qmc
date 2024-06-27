import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { ChartsItemButtons } from "../../../../components/chartsItemButtons";
import DeviationsHeader from "./DeviationsHeader";

import { WarehouseService } from "../../../../services/WarehouseService";

import ColumnComponent from "./ColumnComponent";

import styles from "./Deviations.module.scss";

const buttonsPosition: React.CSSProperties = {
  bottom: "50px",
  right: "20px",
};

const warehouseService = Container.get(WarehouseService);
export const Deviations = observer(() => {
  const warehouseItems = warehouseService.warehouseItems;

  if (warehouseItems.length === 0) return null;

  return (
    <div className={styles.deviations}>
      <DeviationsHeader />
      <ChartsItemButtons inlineStyles={buttonsPosition} />
      <ColumnComponent />
    </div>
  );
});
