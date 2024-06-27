import React from "react";

import { observer } from "mobx-react-lite";
import Container from "typedi";

import { Select } from "antd";

import { ReactComponent as ArrowIcon } from "../../../../assets/icons/grayArrow.svg";
import { ReactComponent as SelectArrowIcon } from "../../../../assets/icons/primary3Arrow.svg";

import { DispensersService } from "../../../../services/DispensersService";

import styles from "./SuppliesCard.module.scss";

interface ISuppliesNumberSwitcherProps {
  number: number;
  title: string;
}

const dispensersService = Container.get(DispensersService);

const SuppliesNumberSwitcher = observer(({ number, title }: ISuppliesNumberSwitcherProps) => {
  const switchDispenserNumbers = dispensersService.switchDispenserNumbers.bind(dispensersService);
  const dispensersPlaces = dispensersService.dispensersPlaces;

  const [select, setSelect] = React.useState(dispensersPlaces);

  const onSelectHandler = React.useCallback(
    (value: string) => {
      switchDispenserNumbers(number, +value);
    },
    [number, switchDispenserNumbers],
  );
  React.useEffect(() => {
    setSelect(dispensersPlaces);
  }, [dispensersPlaces]);

  const selectValue = React.useMemo(() => {
    return select.find((el) => el?.number === number)!?.label;
  }, [dispensersPlaces, number]);

  const selectOptions = React.useMemo(() => {
    return select.map((item) => ({ label: item.label, value: item.number }));
  }, [dispensersPlaces]);

  return (
    <div className={styles.numberSwitcherContainer}>
      <div className={styles.numberSwitcherTitle}>Задание %</div>
      <ArrowIcon />

      <div className={styles.selectorContainer}>
        <SelectArrowIcon
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 8,
            right: 4,
          }}
        />
        <Select style={{ width: 194.5 }} onChange={onSelectHandler} value={selectValue} options={selectOptions} />
      </div>
    </div>
  );
});

export default SuppliesNumberSwitcher;
