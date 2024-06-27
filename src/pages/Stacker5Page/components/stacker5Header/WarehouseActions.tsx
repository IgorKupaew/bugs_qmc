import { observer } from "mobx-react-lite";
import Container from "typedi";

import { ReactComponent as UpdateIcon } from "../../../../assets/icons/update.svg";
import WarehouseOptionalActions from "./WarehouseOptionalActions";

import { WarehouseService } from "../../../../services/WarehouseService";
import { CurrentPersonService } from "../../../../services/CurrentPersonService";

import styles from "./Stacker5Header.module.scss";

const warehouseService = Container.get(WarehouseService);
const currentPersonService = Container.get(CurrentPersonService);

const hasRemoveWarehouseButton = process.env.REACT_APP_HAS_REMOVE_WAREHOUSE_BUTTON === "TRUE";

const WarehouseActions = observer(() => {
  const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);

  const resetPile = warehouseService.resetPile.bind(warehouseService);
  const currentStackerNumber = warehouseService.currentStackerNumber;
  const currentWarehouse = warehouseService.currentWarehouse;

  const createPileHandler = () => {
    openModalWithAction(resetPile, `Обнуление Штабеля №${currentWarehouse.number}. Склад №${currentStackerNumber}`);
  };

  return (
    <div className={styles.warehouseActionsContainer}>
      {hasRemoveWarehouseButton && <WarehouseOptionalActions />}
      <div onClick={createPileHandler} className={styles.warehouseActionsUpdate}>
        <UpdateIcon />
        Создать склад
      </div>
    </div>
  );
});

export default WarehouseActions;
