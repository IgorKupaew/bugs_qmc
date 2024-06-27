import React from "react";

import { classNames } from "../../../../helpers/classnames";

import SuppliesCardTableItem from "./SuppliesCardTableItem";

import styles from "./SuppliesCard.module.scss";

import { suppliesTableDataFormater } from "./helper";
import Container from "typedi";
import { AnalysisService } from "../../../../services/AnalysisService";

import { observer } from "mobx-react-lite";

import { IDispenserItem } from "../../../../types";

interface ISuppliesCardTableProps {
  element: IDispenserItem;
}

const analysisService = Container.get(AnalysisService);

const SuppliesCardTable = observer(({ element }: ISuppliesCardTableProps) => {
  const shiftComponent = analysisService.shiftComponent.isFirstShift;
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div
          className={classNames(styles.tableHeaderType, {
            [styles.tableHeaderItem]: true,
          })}
        >
          Тип
        </div>
        <div
          className={classNames(styles.tableHeaderValue, {
            [styles.tableHeaderItem]: true,
          })}
        >
          Значение
        </div>
        <div
          className={classNames(styles.tableHeaderUnit, {
            [styles.tableHeaderItem]: true,
          })}
        >
          Ед.измерения
        </div>
      </div>
      {suppliesTableDataFormater(element, shiftComponent).map((item) => {
        return (
          <SuppliesCardTableItem id={item.id} type={item.type} value={item.value} unit={item.unit} name={item.name} />
        );
      })}
    </div>
  );
});

export default SuppliesCardTable;
