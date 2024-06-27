import React from "react";
import { observer } from "mobx-react-lite";

import { SuppliesCard } from "../suppliesCard";

import styles from "./SuppliesList.module.scss";

import { DispensersService } from "../../../../services/DispensersService";

import Container from "typedi";

const dispensersService = Container.get(DispensersService);
export const SuppliesList = observer(() => {
  const dispensersList = dispensersService.dispensersList;

  return (
    <div className={styles.suppliesList}>
      {dispensersList.map((item) => (
        <SuppliesCard element={item} />
      ))}
    </div>
  );
});
