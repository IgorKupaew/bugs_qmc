import { observer } from "mobx-react-lite";
import Container from "typedi";

import { getFormatedSubstanceName } from "../../../../helpers/substanceNamesFormatter";
import { AnalyzerService } from "../../../../services/AnalyzerService";
import { useInterval } from "../../../../hooks/useInterval";

import styles from "./InlineAnalyzer.module.scss";
import { toFixed2 } from "../../../../helpers/toFixed2";

const analyzerService = Container.get(AnalyzerService);

export const Table = observer(() => {
  const fetchItems = analyzerService.getAnalyzerItems.bind(analyzerService);
  const analyzerItems = analyzerService.AnalyzerItems;
  const totalWeight = analyzerService.totalWeight;

  useInterval(fetchItems);

  return (
    <div className={styles.table}>
      <div className={styles.tableTitleContainer}>
        <span className={styles.tableTitle}>Химический состав</span>
      </div>
      <div className={styles.tableList}>
        <div className={styles.tableItem}>
          <span className={styles.tableItemName}>Вес, т </span>
          <span className={styles.tableItemValue}>{toFixed2(totalWeight, "Нет данных")}</span>
        </div>
        {analyzerItems.map((item) => {
          let name = item.name;

          if (item.name === "Moisture") {
            name = "Влажность";
          }
          return (
            <div key={item.name} className={styles.tableItem}>
              <span className={styles.tableItemName}>{getFormatedSubstanceName(`${name}`)}</span>
              <span className={styles.tableItemValue}>{toFixed2(item.value, "Нет данных")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
