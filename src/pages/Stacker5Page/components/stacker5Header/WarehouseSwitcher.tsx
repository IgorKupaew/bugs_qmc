import Container from "typedi";
import { observer } from "mobx-react-lite";

import { classNames } from "../../../../helpers/classnames";
import { WarehouseService } from "../../../../services/WarehouseService";

import styles from "./Stacker5Header.module.scss";

const warehouseService = Container.get(WarehouseService);

const WarehouseSwitcher = observer(() => {
  const warehouseItems = warehouseService.warehouseItems;
  const currentWarehouse = warehouseService.currentWarehouse;

  const setCurrentWarehouse = warehouseService.setCurrentWarehouse.bind(warehouseService);
  const getIndexes = warehouseService.getIndexes.bind(warehouseService);
  const getComposition = warehouseService.getComposition.bind(warehouseService);
  const setIsHeatmapDirty = warehouseService.setIsHeatmapDirty.bind(warehouseService);

  return (
    <div className={styles.warehouseSwitcher}>
      <div className={styles.warehouseSwitcherTitle}>Переключить на</div>
      <div className={styles.warehouseSwitcherList}>
        {warehouseItems.map((item) => {
          return (
            <div
              onClick={() => {
                setCurrentWarehouse(item.id);
                getIndexes();
                getComposition({});
                setIsHeatmapDirty(false);
              }}
              className={classNames(styles.warehouseSwitcherItem, {
                [styles.active]: item.id === currentWarehouse.id,
              })}
              key={item.id}
            >
              {"Штабель №" + item.number}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default WarehouseSwitcher;
