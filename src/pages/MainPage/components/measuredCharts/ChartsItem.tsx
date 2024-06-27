import React from "react";

import Container from "typedi";
import { observer } from "mobx-react-lite";

import { Popover } from "antd";

import { ReactComponent as WarningIcon } from "../../../../assets/icons/WarningCircle.svg";
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/Error.svg";

import { getColoredCircle } from "../../../../helpers/getColoredCircle";

import { MainChartsService, TPoint } from "../../../../services/MainChartsService";
import { CurrentPersonService } from "../../../../services/CurrentPersonService";

import ChartsItemButtons from "./ChartsItemButtons";

import { classNames } from "../../../../helpers/classnames";
import styles from "./MeasuredCharts.module.scss";
import AreaComponent from "./AreaComponent";
import { MeasuredChartsFetchComponent } from "./MeasuredChartsFetchComponent";
import { toFixed2 } from "../../../../helpers/toFixed2";

interface IChartsItemProps {
  status: "normal" | "warning" | "error";
  type: TPoint;
  secondValue: string | number;
  fetchStatus: boolean;
  isModalOpen: boolean;
  setFetchingStatus: (value: boolean) => void;
  onChange: (type: TPoint, value: string | number) => void;
}

const mainChartsService = Container.get(MainChartsService);
const currentPersonService = Container.get(CurrentPersonService);

const ChartsItem = observer(
  ({ status, type, secondValue, setFetchingStatus, onChange, fetchStatus, isModalOpen }: IChartsItemProps) => {
    const setPoints = mainChartsService.setPoints.bind(mainChartsService);
    const reload = mainChartsService.reload.bind(mainChartsService);
    const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);
    const inputValue = mainChartsService.points![type];
    const data = mainChartsService.measuredIndexesArraySlice[type];
    const min = mainChartsService.minSliceValue[type];
    const max = mainChartsService.maxSliceValue[type];
    const data2 = mainChartsService.measuredIndexesArray[type];
    const fetchStatuss = mainChartsService.fetchStatus[type];
    const setSlice = mainChartsService.setMeasuredIndexesArraySlice.bind(mainChartsService);

    const [open, setOpen] = React.useState(false);

    const setPointsHandler = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
          openModalWithAction(() => {
            setPoints(type);
            reload();
          }, `Установка ${type}`);
        }
      },
      [type, setPoints, reload, openModalWithAction],
    );

    const onFocusHandler = React.useCallback(() => {
      setFetchingStatus(false);
    }, [setFetchingStatus]);

    const onBlurHandler = React.useCallback(() => {
      setOpen(false);
      setFetchingStatus(true);
    }, [setFetchingStatus]);

    const onChangeHandler = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value > 10 || +e.target.value < 0) {
          setOpen(true);
        } else {
          setOpen(false);
        }
        onChange(type, e.target.value);
      },
      [onChange, type],
    );

    const countedClassNames = React.useMemo(() => {
      return {
        [styles.valueError]: status === "error",
        [styles.valueWarning]: status === "warning",
      };
    }, [status]);

    const handleOpenChange = () => {
      if (inputValue <= 0 || inputValue >= 10) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    const maxMinValue = React.useMemo(() => {
      return <span className={styles.maxMinValue}>{getColoredCircle("#F7E2A3")} Допустимый диапозон 0-10</span>;
    }, [inputValue]);

    React.useEffect(() => {
      const newData = data2.slice(min, max);
      setSlice(type, newData);
    }, [fetchStatuss && data2, min, max]);

    return (
      <div className={styles.chartsItemContainer}>
        {fetchStatus && !isModalOpen && <MeasuredChartsFetchComponent type={type} />}
        <div className={styles.chartsTitle}>
          <div className={styles.titleType}>{type === "kh" ? "KH" : type}</div>
          <div className={styles.titleValues}>
            <div className={styles.titleInput}>
              <Popover content={maxMinValue} trigger="click" open={open} zIndex={1} onOpenChange={handleOpenChange}>
                <input
                  onKeyUp={setPointsHandler}
                  onChange={onChangeHandler}
                  onFocus={onFocusHandler}
                  onBlur={onBlurHandler}
                  type="number"
                  step={0.1}
                  value={toFixed2(inputValue)}
                />
              </Popover>
            </div>
            <div className={styles.titleDivider}>/</div>
            <div className={classNames(styles.value, countedClassNames)}>
              <span>{secondValue}</span>
              {status === "error" && <ErrorIcon />}
              {status === "warning" && <WarningIcon />}
            </div>{" "}
          </div>
        </div>
        <div className={styles.chartsItem}>
          <ChartsItemButtons type={type} />
          <div className={styles.areaContainer}>
            <AreaComponent data={data} type={type} />
          </div>
        </div>
      </div>
    );
  },
);

export default ChartsItem;
