import Container from "typedi";
import { observer } from "mobx-react-lite";
import { Input } from "antd";

import { AnalysisService } from "../../../../services/AnalysisService";

import AnalysisTableItemInputs from "./AnalysisTableItemInputs";
import AnalysisTableItemNames from "./AnalysisTableItemNames";

import styles from "./AnalysisTableItem.module.scss";

interface IAnalysisTableItemProps {
  date: string;
}

const analysisService = Container.get(AnalysisService);

export const AnalysisTableItem = observer(({ date }: IAnalysisTableItemProps) => {
  const changeDateOfComponents = analysisService.changeDateOfComponents.bind(analysisService);
  const currentDictItem = analysisService.componentsDict[date];

  const onDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDateOfComponents(date, e.target.valueAsDate?.toISOString() || "");
  };

  return (
    <div className={styles.table}>
      <div className={styles.dutyName}>
        <AnalysisTableItemNames date={date} item={currentDictItem[0]} />
      </div>
      <Input
        style={{ width: 180 }}
        defaultValue={date}
        onChange={onDateChangeHandler}
        className={styles.date}
        type="date"
      />
      <div className={styles.elementContainer}>
        {currentDictItem.map((item, i) => {
          return <AnalysisTableItemInputs item={item} key={i} />;
        })}
      </div>
    </div>
  );
});
