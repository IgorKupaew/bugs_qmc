import { Slider } from "antd";

import { getFormattedTimeRange } from "../../../../helpers/getFormattedTimeRange";

import { maxMilliseconds, minMilliseconds } from "../../consts";

interface IProps {
  value: number;
  setValue: (val: number) => void;
}

export const TimeRangeSlider = ({ value, setValue }: IProps) => {
  const handleChange = (value: number) => {
    setValue(value);
  };

  return (
    <div>
      <Slider
        handleStyle={{
          border: "1px solid #9299F7",
          backgroundColor: "#5B5FC7",
        }}
        trackStyle={{ backgroundColor: "#5B5FC7" }}
        railStyle={{ backgroundColor: "#E8EBFA" }}
        style={{ width: 800 }}
        value={value}
        onChange={handleChange}
        min={minMilliseconds}
        max={maxMilliseconds}
        tooltip={{
          formatter: getFormattedTimeRange,
        }}
      />
    </div>
  );
};
