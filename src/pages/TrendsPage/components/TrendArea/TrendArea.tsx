import { Area, AreaConfig } from "@ant-design/charts";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

import { getFormattedDate } from "../../../../helpers/getFormattedDate";
import { toFixed2 } from "../../../../helpers/toFixed2";
import { getTimeFromISOString } from "../../../../helpers/getTimeFromIsoString";
import { capitalizeFirstLetter } from "../../../../helpers/capitalizeFirstLetter";

import { TTrendListItem } from "../../types";
import { ITrendItem } from "../../../../types";

interface IArea {
  type: TTrendListItem;
  data: ITrendItem[];
}

const NotSubstanceList = ["tonnage", "moisture"];

export const TrendArea = observer(({ type, data }: IArea) => {
  const typeName = useMemo(() => {
    if (!NotSubstanceList.includes(type)) return capitalizeFirstLetter(type);

    if (type === "tonnage") return "Вес";
    if (type === "moisture") return "Влажность";
  }, [type]);

  const config = {
    data: data,
    xField: "ts",
    xAxis: {
      label: {
        formatter: (ISODate: string) => {
          return getFormattedDate(ISODate);
        },
      },
    },
    yField: type,
    height: 409,
    width: 800,
    className: "changed__tooltip",
    line: {
      style: {
        stroke: "#5B5FC7",
        lineWidth: 2,
        lineDash: [0, 0],
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        cursor: "pointer",
      },
    },
    yAxis: {
      visible: true,
      grid: null,
    },
    areaStyle: {
      fillOpacity: 0,
    },
    tooltip: {
      showMarkers: true,
      formatter: (item: ITrendItem) => {
        const tooltipContent = [
          `<div style='display: flex; justify-content: space-between'>
        <div style='color: #C7C7C7'>Время:</div> <div style='color: #F5F5F5'>${getTimeFromISOString(
          item.ts,
        )}</div></div> `,
          `<div style='display: flex; justify-content: space-between'>
        <div style='color: #C7C7C7'>${typeName}:</div> <div style='color: ${
          (item[type] < 0.6 && "#EE5157") || (item[type] <= 1.5 && "#FFB900") || "white"
        }'>${toFixed2(item[type])}</div></div>`,
        ].join("\n");

        return {
          name: "",
          value: tooltipContent,
        };
      },
    },
  };
  return <Area {...(config as unknown as AreaConfig)} />;
});
