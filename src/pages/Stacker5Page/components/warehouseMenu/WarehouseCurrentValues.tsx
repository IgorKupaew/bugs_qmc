import React from "react";

import styles from "./WarehouseMenu.module.scss";
import Container from "typedi";
import { WarehouseService } from "../../../../services/WarehouseService";
import { Loader } from "../../../../components/loader";
import { observer } from "mobx-react-lite";
import { toFixed2 } from "../../../../helpers/toFixed2";

const warehouseService = Container.get(WarehouseService);

const WarehouseCurrentValues = observer(() => {
  const composition = warehouseService.compositionForTable;
  const tonnage = warehouseService.compositionForTable?.tonnage;
  const isLoading = warehouseService.isLoading;

  const formatedCurrentValues = React.useMemo(() => {
    return [
      { name: "KH", value: toFixed2(composition && composition.kh) },
      { name: "n", value: toFixed2(composition && composition.n) },
      { name: "p", value: toFixed2(composition && composition.p) },
    ];
  }, [composition]);

  if ((!composition || !tonnage) && isLoading) return <Loader />;

  return (
    <div className={styles.warehouseCurrentValues}>
      <div className={styles.warehouseCurrentValuesLabel}>Текущие значения</div>
      <div className={styles.warehouseCurrentValuesBlock}>
        <div className={styles.warehouseCurrentValuesBlockCommon}>
          {formatedCurrentValues?.map((item) => (
            <div key={item.name} className={styles.currentValue}>
              <div className={styles.currentValueName}>{item.name}</div>
              <div className={styles.currentValueValue}>{item.value ? item.value : "-"}</div>
            </div>
          ))}
        </div>
        <div className={styles.warehouseCurrentValuesBlockAdditional}>
          <div className={styles.currentValueName}>Вес, т</div>
          <div className={styles.currentValueValue}>{toFixed2(tonnage, "Данные о весе не найдены")}</div>
        </div>
      </div>
    </div>
  );
});

export default WarehouseCurrentValues;
