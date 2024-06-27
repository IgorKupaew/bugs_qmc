import { observer } from "mobx-react-lite";
import React from "react";
import Container from "typedi";

import { DispensersService } from "../../../../services/DispensersService";

import styles from "./SuppliesCard.module.scss";

interface ISuppliesCardTableItemProps {
  type: string;
  value: number;
  unit: string;
  name: string;
  id: string;
}

const dispensersService = Container.get(DispensersService);

const SuppliesCardTableItem = observer(({ type, value, unit, name, id }: ISuppliesCardTableItemProps) => {
  const [inputValue, setInputValue] = React.useState(value);
  const changeSubstance = dispensersService.changeSubstance.bind(dispensersService);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.currentTarget.value);
    changeSubstance(id, name, +e.currentTarget.value);
  };
  return (
    <div className={styles.tableItem} key={type}>
      <div className={styles.tableType}>{type}</div>
      <input className={styles.tableValue} readOnly value={value} />
      <input readOnly className={styles.tableUnit} value={unit} />
    </div>
  );
});

export default SuppliesCardTableItem;
