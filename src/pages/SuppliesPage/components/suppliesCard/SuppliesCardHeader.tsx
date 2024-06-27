import React from "react";

import { observer } from "mobx-react-lite";
import Container from "typedi";
import { Select } from "antd";

import { ReactComponent as CheckedIcon } from "../../../../assets/icons/customCheckbox.svg";
import { ReactComponent as SelectArrowIcon } from "../../../../assets/icons/primary3Arrow.svg";

import { DispensersService } from "../../../../services/DispensersService";
import { AnalysisService } from "../../../../services/AnalysisService";

import { classNames } from "../../../../helpers/classnames";
import styles from "./SuppliesCard.module.scss";

interface ISuppliesCardHeaderProps {
  title: string | null | undefined;
  isCalc: boolean;
  id: string;
}

const dispensersService = Container.get(DispensersService);
const analysisService = Container.get(AnalysisService);

const SuppliesCardHeader = observer(({ title, isCalc, id }: ISuppliesCardHeaderProps) => {
  const switchComponent = dispensersService.switchComponent.bind(dispensersService);
  const changeIsCalc = dispensersService.changeIsCalc.bind(dispensersService);
  let components = analysisService.components;
  const setIsCheckedHandler = React.useCallback(() => {
    changeIsCalc(id, !isCalc);
  }, [isCalc, id, changeIsCalc]);

  const onSelectHandler = React.useCallback((value: string) => {
    switchComponent(
      components.find((el) => el.id === value),
      id,
    );
  }, []);

  const selectValue = React.useMemo(() => {
    return components.find((el) => el.id === title) === null ? "Материал" : title;
  }, [components, title]);

  const selectOptions = React.useMemo(() => {
    return components.map((item) => ({
      label: item.title === null ? "Материал" : item.title,
      value: item.id,
    }));
  }, [components]);
  return (
    <div className={styles.cardHeader}>
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

      <div className={styles.isCalculate}>
        <div
          className={classNames(styles.checkboxContainer, {
            [styles.checkedCheckbox]: !isCalc,
          })}
        >
          <input checked={isCalc} className={styles.isCalculateCheckbox} type="checkbox" />
          {isCalc ? <CheckedIcon /> : null}
        </div>
        <div className={styles.isCalculateText}>{isCalc ? "Включено в расчёт" : "Не включено в расчёт"}</div>
      </div>
    </div>
  );
});

export default SuppliesCardHeader;
