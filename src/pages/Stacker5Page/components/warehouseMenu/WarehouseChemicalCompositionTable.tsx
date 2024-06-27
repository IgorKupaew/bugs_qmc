import React from "react";

import { getFormatedSubstanceName, getFormatedValueWithComma } from "../../../../helpers/substanceNamesFormatter";

import styles from "./WarehouseMenu.module.scss";
import Container from "typedi";
import { WarehouseService } from "../../../../services/WarehouseService";
import { Loader } from "../../../../components/loader";
import { observer } from "mobx-react-lite";
import { toFixed2 } from "../../../../helpers/toFixed2";

const warehouseService = Container.get(WarehouseService);

const WarehouseChemicalCompositionTable = observer(() => {
  const composition = warehouseService.compositionForTable;
  const currentLayer = warehouseService.currentLayer;
  const { number: currentWarehouseNumber } = warehouseService.currentWarehouse;
  const isHeatmapDirty = warehouseService.isHeatmapDirty;
  const isLoading = warehouseService.isLoading;

  const fetchedChemicalComposition = React.useMemo(() => {
    return [
      { name: "SiO2", value: toFixed2(composition?.siO2, 0) },
      { name: "Al2O3", value: toFixed2(composition?.al2O3, 0) },
      { name: "Fe2O3", value: toFixed2(composition?.fe2O3, 0) },
      { name: "CaO", value: toFixed2(composition?.caO, 0) },
      { name: "MgO", value: toFixed2(composition?.mgO, 0) },
      { name: "SO3", value: toFixed2(composition?.sO3, 0) },
      { name: "ппп", value: toFixed2(composition?.p, 0) },
      // { name: "Сумма", value: toFixed2(composition?.tonnage, 0) },
    ];
  }, [composition]);

  const chemicalComposition = React.useMemo(() => {
    if (composition) {
      return fetchedChemicalComposition.map((item) => ({
        name: getFormatedSubstanceName(item.name),
        value: getFormatedValueWithComma(+item.value!),
      }));
    }
    return [];
  }, [composition, fetchedChemicalComposition]);

  const Title = React.useMemo(() => {
    if (currentLayer !== null && currentLayer >= 0 && isHeatmapDirty) {
      return `Химический состав слоя ${currentLayer}, %`;
    }
    return `Химический состав склада ${currentWarehouseNumber}, %`;
  }, [currentLayer, currentWarehouseNumber, isHeatmapDirty]);

  if (!composition && isLoading) return <Loader />;

  if (!composition) {
    return (
      <div className={styles.warehouseChemicalCompositionTable}>
        <div className={styles.warehouseChemicalCompositionTableTitle}>{Title}</div>
        <div className={styles.warehouseChemicalCompositionTableList}>
          <div>Данные о химическом составе не найдены</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.warehouseChemicalCompositionTable}>
      <div className={styles.warehouseChemicalCompositionTableTitle}>{Title}</div>
      <div className={styles.warehouseChemicalCompositionTableList}>
        {chemicalComposition.map((item) => {
          return (
            <div key={item.name as unknown as string} className={styles.warehouseChemicalCompositionTableItem}>
              <div className={styles.warehouseChemicalCompositionTableItemName}>{item.name}</div>
              <div className={styles.warehouseChemicalCompositionTableItemValue}>{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default WarehouseChemicalCompositionTable;
