import { DatePicker } from "antd";
import React from "react";

const { RangePicker } = DatePicker;

interface IDeviationsRangePickerProps {
  setIsOpen: (value: boolean) => void;
  currentDate: any;
  setValueHandler: any;
}

const DeviationsRangePicker = ({ setIsOpen, currentDate, setValueHandler }: IDeviationsRangePickerProps) => {
  const closePickerHandler = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const closePickerKeyHandler = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  return (
    <div>
      <RangePicker
        value={currentDate}
        onChange={setValueHandler}
        autoFocus
        onKeyDown={closePickerKeyHandler}
        onBlur={closePickerHandler}
      />
    </div>
  );
};

export default DeviationsRangePicker;
