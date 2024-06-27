import { Area, AreaConfig } from "@ant-design/charts";

import { IMeasuredIndexes } from "../../../../services/MainChartsService";
import { observer } from "mobx-react-lite";

interface IArea {
  type: string;
  data: IMeasuredIndexes[];
}

const AreaComponent = observer(({ type, data }: IArea) => {
  const config = {
    data: data,
    xField: "time",
    yField: type,
    smooth: true,
    height: 409,
    className: "changed__tooltip",
    line: {
      style: {
        stroke: "#5B5FC7",
        lineWidth: 2,
        lineDash: [0, 0],
        shadowColor: "#5B5FC7",
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        cursor: "pointer",
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: true,
      grid: null,
    },
    areaStyle: {
      fill: "l(270) 0:#ffffff 0.5:#E8EBFA 1:#d2b6fa",
      fillOpacity: 0.6,
    },
    tooltip: {
      showMarkers: true,
      formatter: (item: any) => {
        const tooltipContent = [
          `<div style='display: flex; justify-content: space-between'>
        <div style='color: #C7C7C7'>Время:</div> <div style='color: #F5F5F5'>${item.time}</div></div> `,
          `<div style='display: flex; justify-content: space-between'>
        <div style='color: #C7C7C7'>${type}:</div> <div style='color: ${
          (item[type] < 0.6 && "#EE5157") || (item[type] <= 1.5 && "#FFB900") || "white"
        }'>${item[type]}</div></div>`,
        ].join("\n");

        return {
          name: "",
          value: tooltipContent,
        };
      },
    },
  };
  return <Area {...(config as AreaConfig)} />;
});

export default AreaComponent;
