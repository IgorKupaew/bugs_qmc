import Container from "typedi";
import React from "react";
import { observer } from "mobx-react-lite";

import { WarehouseService } from "../../../../services/WarehouseService";
import { getFormatedSubstanceName, getFormatedValueWithComma } from "../../../../helpers/substanceNamesFormatter";

import MineralTablePie from "./MineralTablePie";
import { getColoredCircle } from "../../../../helpers/getColoredCircle";
import { Loader } from "../../../../components/loader";

import styles from "./WarehouseMenu.module.scss";
import { toFixed2 } from "../../../../helpers/toFixed2";

const warehouseService = Container.get(WarehouseService);

const WarehouseMineralCompositionTable = observer(() => {
  const [mineralValuesSum, setMineralValuesSum] = React.useState(0);
  const composition = warehouseService.compositionForTable;
  const isLoading = warehouseService.isLoading;
  const currentLayer = warehouseService.currentLayer;
  const { number: currentWarehouseNumber } = warehouseService.currentWarehouse;
  const isHeatmapDirty = warehouseService.isHeatmapDirty;

  const mineralComposition = React.useMemo(() => {
    if (composition) {
      return [
        { name: "C3S", value: composition && toFixed2(composition?.c3S, 0), color: "#808BF1" },
        { name: "C2S", value: composition && toFixed2(composition?.c2S, 0), color: "#FAB5F7" },
        { name: "C3A", value: composition && toFixed2(composition?.c3A, 0), color: "#B0EFA1" },
        { name: "C4AF", value: composition && toFixed2(composition?.c4AF, 0), color: "#68B4DE" },
      ];
    }
    return [];
  }, [composition]);

  const formattedMineralComposition = React.useMemo(() => {
    setMineralValuesSum(0);
    return mineralComposition.map((item) => {
      setMineralValuesSum((prev) => prev + +item.value);
      return {
        ...item,
        name: getFormatedSubstanceName(item.name),
        value: getFormatedValueWithComma(+item.value),
      };
    });
  }, [mineralComposition]);

  const Title = React.useMemo(() => {
    if (currentLayer !== null && currentLayer >= 0 && isHeatmapDirty) {
      return `Минералогический состав слоя ${currentLayer}, %`;
    }
    return `Минералогический состав склада ${currentWarehouseNumber}, %`;
  }, [currentLayer, currentWarehouseNumber, isHeatmapDirty]);

  if (!composition && isLoading) return <Loader />;

  return (
    <div className={styles.mineralTableContainer}>
      <div className={styles.mineralTableTitle}>{Title}</div>
      <div className={styles.mineralTable}>
        <MineralTablePie />
        <div className={styles.mineralTableList}>
          {formattedMineralComposition.map((item) => (
            <div className={styles.mineralItem}>
              <div className={styles.mineralItemName}>
                {getColoredCircle(item.color, 6)}
                <div>{item.name}</div>
              </div>
              <div className={styles.mineralItemValue}>{item.value}</div>
            </div>
          ))}
          <div className={styles.mineralItem}>
            <div className={styles.mineralItemName}>Сумма</div>
            <div className={styles.mineralItemValue}>{toFixed2(mineralValuesSum)}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WarehouseMineralCompositionTable;
