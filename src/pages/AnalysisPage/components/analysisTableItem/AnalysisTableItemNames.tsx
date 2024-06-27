import React from "react";
import Container from "typedi";

import { AnalysisService } from "../../../../services/AnalysisService";
import { IDispenserComponent } from "../../../../types";

import styles from "./AnalysisTableItem.module.scss";

const analysisService = Container.get(AnalysisService);

interface INames {
  item: Omit<IDispenserComponent, "ts">;
  date: string;
}

const AnalysisTableItemNames = ({ item, date }: INames) => {
  const changeComponentsName = analysisService.changeComponentsName.bind(analysisService);

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeComponentsName(date, "dutyName", e.target.value);
  };
  return <input className={styles.dutyNameItem} onChange={onchange} defaultValue={item.dutyName} />;
};

export default AnalysisTableItemNames;
