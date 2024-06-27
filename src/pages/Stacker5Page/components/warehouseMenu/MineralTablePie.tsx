import React from "react";

import { Pie } from "@ant-design/plots";

const MineralTablePie = () => {
  const data = [
    {
      type: "C3S",
      value: 58.8,
      color: "#808BF1",
    },
    {
      type: "C2S",
      value: 19.3,
      color: "#FAB5F7",
    },
    {
      type: "C3A",
      value: 4.2,
      color: "#B0EFA1",
    },
    {
      type: "C4AF",
      value: 12.8,
      color: "#68B4DE",
    },
  ];
  const config: any = {
    data,
    angleField: "value",
    colorField: "color",
    color: (value: any) => value.color,
    radius: 0.9,
    label: false,
    legend: false,
    interactions: [
      {
        type: "element-active",
      },
    ],
    tooltip: false,
    style: {
      width: 93,
      height: 93,
    },
  };
  return <Pie {...config} />;
};

export default MineralTablePie;
