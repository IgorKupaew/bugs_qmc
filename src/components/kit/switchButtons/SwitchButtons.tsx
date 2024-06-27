import { Menu } from "antd";
import React from "react";

interface ISwitchButtonsProps {
  items: any[];
  defaultValue: string;
}

export const SwitchButtons = ({ items, defaultValue }: ISwitchButtonsProps) => {
  const [workMode, setWorkMode] = React.useState(defaultValue);

  const onClickHandler = (e: any) => {
    setWorkMode(e.key);
  };
  return (
    <div className="switchButtons">
      <Menu onClick={onClickHandler} selectedKeys={[workMode]} mode="horizontal" items={items} />
    </div>
  );
};
