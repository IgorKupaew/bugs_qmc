import { Slider, SliderSingleProps } from "antd";
import React from "react";

import styles from "./CustomSlider.module.scss";
import { SliderRangeProps } from "antd/lib/slider";
import Container from "typedi";
import { MainChartsService } from "../../services/MainChartsService";

type TCustomSliderProps = Record<string, keyof SliderSingleProps & keyof SliderRangeProps & any> & {
  label?: string;
  min: number;
  max: number;
  value: number | undefined;
  id: string;
};

const mainChartsService = Container.get(MainChartsService);

export const CustomSlider = ({ id, min, max, value, label, ...props }: TCustomSliderProps) => {
  const onChangePoints = mainChartsService.pointsPriorityOnChange.bind(mainChartsService);

  const onChangeHandler = React.useCallback(
    (value: any) => {
      onChangePoints(id, value);
    },
    [onChangePoints, id],
  );
  return (
    <div className={styles.sliderContainer}>
      {label && <div className={styles.label}>{label}</div>}
      <Slider
        id={id}
        handleStyle={{
          border: "1px solid #9299F7",
          backgroundColor: "#5B5FC7",
        }}
        trackStyle={{ backgroundColor: "#5B5FC7" }}
        railStyle={{ backgroundColor: "#E8EBFA" }}
        style={{ minWidth: 135 }}
        value={value}
        onChange={onChangeHandler}
        min={min}
        max={max}
        {...props}
      />
      <div className={styles.valueDisplay}>{value}</div>
    </div>
  );
};
