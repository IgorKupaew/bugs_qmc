import React from "react";
import { observer } from "mobx-react-lite";

import { ReactComponent as CalendarIcon } from "../../../../assets/icons/openCalendar.svg";
import DeviationsRangePicker from "./DeviationsRangePicker";

import styles from "./Deviations.module.scss";
import Container from "typedi";
import { WarehouseService } from "../../../../services/WarehouseService";

const wareHouseService = Container.get(WarehouseService);

const ChoosePeriod = observer(() => {
  const setCurrentDate = wareHouseService.setCurrentDate.bind(wareHouseService);
  const [isRangePickerOpen, setIsRangePickerOpen] = React.useState(false);
  const [currentDate, setCurrentDate2] = React.useState<any>(null);

  const toggleIsRangePickerOpen = () => {
    setIsRangePickerOpen(true);
  };

  const setValueHandler = (moment: any) => {
    setCurrentDate2(moment);
    setCurrentDate(moment);
  };
  return (
    <div onClick={toggleIsRangePickerOpen} className={styles.choosePeriod}>
      {isRangePickerOpen ? (
        <DeviationsRangePicker
          setValueHandler={setValueHandler}
          currentDate={currentDate}
          setIsOpen={setIsRangePickerOpen}
        />
      ) : (
        <>
          <CalendarIcon />
          <div className={styles.choosePeriodLabel}>Выбрать период</div>{" "}
        </>
      )}
    </div>
  );
});

export default ChoosePeriod;
