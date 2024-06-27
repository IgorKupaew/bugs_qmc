import React from "react";

import styles from "./SuppliesCard.module.scss";

import SuppliesCardHeader from "./SuppliesCardHeader";
import SuppliesCardTable from "./SuppliesCardTable";
import SuppliesNumberSwitcher from "./SuppliesNumberSwitcher";
import SuppliesCardStatus from "./SuppliesCardStatus";

import { type IDispenserItem } from "../../../../types";
import { observer } from "mobx-react-lite";

interface ISuppliesCardProps {
  element: IDispenserItem;
}
export const SuppliesCard = observer(({ element }: ISuppliesCardProps) => {
  return (
    <div className={styles.card}>
      <SuppliesCardHeader title={element.component?.title} id={element.id} isCalc={element.shouldBeIncludedToCalc} />
      <SuppliesCardTable element={element} />
      <SuppliesNumberSwitcher title={element.title} number={element.number} />
      <SuppliesCardStatus />
    </div>
  );
});
