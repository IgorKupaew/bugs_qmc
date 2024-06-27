import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";
import { Popover } from "antd";
import Switch from "antd/lib/switch/index";
import Card from "antd/lib/card/Card";
import Input from "antd/lib/input/Input";

import { ReactComponent as CaretDoubleDownIcon } from "../../../../assets/icons/CaretDoubleDown.svg";
import { ReactComponent as Prohibit } from "../../../../assets/icons/Prohibit.svg";
import { ReactComponent as PIcon } from "../../../../assets/icons/Р.svg";
import { ReactComponent as AIcon } from "../../../../assets/icons/А.svg";
import { ReactComponent as StrokeLine } from "../../../../assets/icons/stokeLine.svg";

import { classNames } from "../../../../helpers/classnames";
import { getColoredCircle } from "../../../../helpers/getColoredCircle";
import { toFixed2 } from "../../../../helpers/toFixed2";

import { MainChartsService } from "../../../../services/MainChartsService";
import { DispensersService } from "../../../../services/DispensersService";
import { CurrentPersonService } from "../../../../services/CurrentPersonService";
import { FetchService } from "../../../../services/FetchService";

import styles from "../measuredCharts/MeasuredCharts.module.scss";
import cls from "./DispenserCard.module.scss";

import type { IDispenserItem } from "../../../../types";

interface MainCardProps {
  className?: string;
  element: IDispenserItem;
  shouldBeIncludedToCalc: boolean;
}

const suffixP = <PIcon className={cls.inputSvg}></PIcon>;
const suffixA = <AIcon className={cls.inputSvg}></AIcon>;

const mainChartsService = Container.get(MainChartsService);
const dispensersService = Container.get(DispensersService);
const currentPersonService = Container.get(CurrentPersonService);
const fetchService = Container.get(FetchService);

export const DispenserCard = observer(({ className, element, shouldBeIncludedToCalc }: MainCardProps): JSX.Element => {
  const [openQMC, setOpenQMC] = React.useState(false);
  // const [openHumidity, setOpenHumidity] = React.useState(false);

  const points = mainChartsService.points;
  const autoMode = mainChartsService.points?.autoMode;

  const setFetchStatus = fetchService.setFetchStatus.bind(fetchService);
  const changeShouldBeincludedToCalc = dispensersService.changeShouldBeincludedToCalc.bind(dispensersService);
  // const changeHumidity = dispensersService.changeHumidity.bind(dispensersService);
  const changeQMCPoint = dispensersService.changeQMCPoint.bind(dispensersService);
  const openModalWithAction = currentPersonService.openModalWithAction.bind(currentPersonService);
  const setHumidity = dispensersService.setHumidity.bind(dispensersService);
  const setQMCPoint = dispensersService.setQMCPoint.bind(dispensersService);

  const onChange = React.useCallback(() => {
    openModalWithAction(() => {
      changeShouldBeincludedToCalc(element);
    }, `Изменение активности дозатора id: ${element.id}, status: ${element.isWorking}`);
  }, [changeShouldBeincludedToCalc, element, openModalWithAction]);

  const setHumidityHandler = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = e.currentTarget.value;
        e.currentTarget.blur();
        openModalWithAction(() => {
          setHumidity(element, value);
        }, `Установка влажности, id дозатора: ${element.id} значение: ${value}`);
      }
    },
    [element, openModalWithAction, setHumidity],
  );

  const setQMCPointHandler = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = e.currentTarget.value;
        e.currentTarget.blur();
        openModalWithAction(() => {
          setQMCPoint(element, value);
        }, `Установка QMCPoint, id дозатора: ${element.id} значение: ${value}`);
      }
    },
    [element, openModalWithAction, setQMCPoint],
  );
  const QMConChangeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (+e.target.value > 100 || +e.target.value < 0) {
        setOpenQMC(true);
      } else {
        setOpenQMC(false);
      }
      changeQMCPoint(element.id, e.target.value);
    },
    [element, changeQMCPoint],
  );

  // const humidityOnChangeHandler = React.useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (+e.target.value > 10 || +e.target.value < 0) {
  //       setOpenHumidity(true);
  //     } else {
  //       setOpenHumidity(false);
  //     }
  //     changeHumidity(element.id, e.target.value);
  //   },
  //   [element, changeHumidity],
  // );

  const onBlurHandler = React.useCallback(() => {
    setOpenQMC(false);
    // setOpenHumidity(false);
    setFetchStatus(true);
  }, [setFetchStatus]);

  const QMCHandleOpenChange = React.useCallback(() => {
    if (element.qmcSetPoint <= 0 || element.qmcSetPoint >= 100) {
      setOpenQMC(true);
    } else {
      setOpenQMC(false);
    }
  }, [element]);

  // const humidityHandleOpenChange = React.useCallback(() => {
  //   if ((element?.component?.humidity || 0) <= 0 || (element?.component?.humidity || 0) >= 10) {
  //     setOpenHumidity(true);
  //   } else {
  //     setOpenHumidity(false);
  //   }
  // }, [element, setOpenHumidity]);

  const maxMinValue = React.useMemo(() => {
    return <span className={styles.maxMinValue}>{getColoredCircle("#F7E2A3")} Допустимый диапозон 0-100</span>; // TODO: сделать общую точку истины у диапазона
  }, [element.qmcSetPoint]);

  const qmcSetPointLastChange = +toFixed2(element?.qmcSetPointLastChange || 0);

  const getInputHumidityValue = (val: number) => {
    if (val > 0) {
      return `+${val}`;
    }
    if (val < 0) {
      return `-${val}`;
    }

    return `${val}`;
  };

  return (
    <div className={cls.cardWrapper}>
      <Card
        bordered={false}
        title={element?.component?.title || "Дозатор"}
        className={classNames(cls.maincard, {}, [className as string])}
        headStyle={{
          color: shouldBeIncludedToCalc ? "#242424" : "#616161",
          fontWeight: "700",
        }}
        extra={
          <Switch
            onChange={onChange}
            className={cls.switchBtn}
            checked={shouldBeIncludedToCalc}
            defaultChecked={shouldBeIncludedToCalc}
          />
        }
        actions={[
          <div className={cls.footerWrapper}>
            <div className={cls.cardFooter}>
              {element.performance ? <CaretDoubleDownIcon /> : <Prohibit />}
              {element.performance ? (
                <div>
                  <span>{toFixed2(element.performance)}</span> т/час
                </div>
              ) : (
                <div>
                  <span className={cls.noVolumeSpan}></span> т/час
                </div>
              )}
            </div>
          </div>,
        ]}
      >
        <div className={cls.cardRow}>
          <div
            className={classNames(cls.cardRowTitle, {
              [cls.statusTitle]: !shouldBeIncludedToCalc,
            })}
          >
            QMC уставка, %
          </div>
          <Popover content={maxMinValue} trigger="click" open={openQMC} zIndex={2} onOpenChange={QMCHandleOpenChange}>
            <Input
              step={0.1}
              style={{ color: "#000" }}
              type="number"
              disabled={autoMode}
              value={toFixed2(element?.qmcSetPoint)}
              onKeyUp={setQMCPointHandler}
              onFocus={() => setFetchStatus(false)}
              onBlur={onBlurHandler}
              onChange={QMConChangeHandler}
              className={cls.cardRowInput}
            />
          </Popover>
        </div>
        <div className={cls.cardRow}>
          <div
            className={classNames(cls.cardRowTitle, {
              [cls.statusTitle]: !shouldBeIncludedToCalc,
            })}
          >
            Актуальная, %
          </div>
          <Input
            value={element.actualSetPoint}
            className={cls.cardRowInput}
            suffix={points?.autoMode ? suffixA : suffixP}
          />
        </div>
        <div className={cls.cardRow}>
          <div
            className={classNames(cls.cardRowTitle, {
              [cls.statusTitle]: !shouldBeIncludedToCalc,
            })}
          >
            Корректировка, %
          </div>
          {/* <Popover
            content={<span className={styles.maxMinValue}>{getColoredCircle("#F7E2A3")} Допустимый диапозон 0-10</span>}
            trigger="click"
            open={openHumidity}
            zIndex={5}
            onOpenChange={humidityHandleOpenChange}
          > */}
          <Input
            disabled={!shouldBeIncludedToCalc}
            value={getInputHumidityValue(qmcSetPointLastChange)}
            onKeyUp={setHumidityHandler}
            onFocus={() => setFetchStatus(false)}
            onBlur={onBlurHandler}
            // step={0.1}
            // onChange={humidityOnChangeHandler}
            className={classNames(cls.humidityInput, {
              [cls.statusHumidity]: !shouldBeIncludedToCalc,
              [cls.statusHumidityZero]: qmcSetPointLastChange === 0,
              [cls.statusHumidityMoreThanZero]: qmcSetPointLastChange > 0,
              [cls.statusHumidityLessThanZero]: qmcSetPointLastChange < 0,
            })}
          />
          {/* </Popover> */}
        </div>
      </Card>
      {shouldBeIncludedToCalc ? <StrokeLine className={cls.stroke} /> : <></>}
    </div>
  );
});
