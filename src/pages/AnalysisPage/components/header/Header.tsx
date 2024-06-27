import Container from "typedi";
import { observer } from "mobx-react-lite";

import { AnalysisService } from "../../../../services/AnalysisService";
import { CurrentPersonService } from "../../../../services/CurrentPersonService";
import { DispensersService } from "../../../../services/DispensersService";

import { SaveButtons } from "../../../../components/saveButtons";

import ShiftsNumbers from "../../../../components/shiftsNumbers/ShiftNumbers";

import styles from "./Header.module.scss";

const analysisService = Container.get(AnalysisService);
const currentPersonService = Container.get(CurrentPersonService);
const dispensersService = Container.get(DispensersService);

export const Header = observer(() => {
  const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);
  const setComponents = analysisService.setComponents.bind(analysisService);
  const resetComponents = analysisService.resetComponents.bind(analysisService);
  const setSupplies = dispensersService.setSupplies.bind(dispensersService);

  const currentShiftNumber = analysisService.shiftComponent.isFirstShift ? 1 : 2;

  const save = async () => {
    await setComponents();
    await setSupplies();
  };
  const onSaveHandler = () => {
    openModalWithAction(save, "Сохранение новых данных анализа");
  };

  const onCancelHandler = async () => {
    await resetComponents();
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>Ввод данных по анализу - Номер смены {currentShiftNumber}</div>
      <div className={styles.right}>
        <ShiftsNumbers />
        <SaveButtons onCancel={onCancelHandler} onSave={onSaveHandler} />
      </div>
    </div>
  );
});
