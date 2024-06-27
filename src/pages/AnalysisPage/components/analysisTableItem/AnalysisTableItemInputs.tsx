import React from "react";
import { observer } from "mobx-react-lite";
import Container from "typedi";

import { AnalysisService } from "../../../../services/AnalysisService";

import styles from "./AnalysisTableItem.module.scss";

const analysisService = Container.get(AnalysisService);

interface Inputs {
  item: any;
}

const AnalysisTableItemInputs = observer(({ item }: Inputs) => {
  const changeComponents = analysisService.changeComponents.bind(analysisService);
  const shiftComponent = analysisService.shiftComponent.isFirstShift;

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeComponents(item.ts.split("T")[0], e.currentTarget.id, e.target.value, item.id);
  };

  const onChangeStuff = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeComponents(item.ts.split("T")[0], e.currentTarget.id, e.target.value, item.id);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const arrayOfElements = React.useMemo(() => {
    return Object.keys(item).filter((el) =>
      shiftComponent ? !el.includes("second") && el.includes("tage") : el.includes("second"),
    );
  }, [item, shiftComponent]);

  return (
    <div key={item.id} className={styles.inputs}>
      <div className={styles.stuff}>
        <input
          id={"title"}
          className={styles.stuffItem}
          onChange={onChangeStuff}
          defaultValue={item.title === null ? "Материал" : item.title}
        />
      </div>
      <div className={styles.element}>
        {arrayOfElements.map((el) => (
          <input
            id={el}
            className={styles.elementItem}
            type={"number"}
            max={"100000"}
            onChange={onchange}
            onKeyDown={onEnterPress}
            value={item[el]}
            key={el}
          />
        ))}
      </div>
    </div>
  );
});

export default AnalysisTableItemInputs;
