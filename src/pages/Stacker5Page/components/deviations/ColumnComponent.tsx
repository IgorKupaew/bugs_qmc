import { observer } from "mobx-react-lite";
import Container from "typedi";
import { Column } from "@ant-design/plots";

import { MainChartsService } from "../../../../services/MainChartsService";
import { WarehouseService } from "../../../../services/WarehouseService";
import { Empty } from "antd";

import styles from "./Deviations.module.scss";

const mainChartsService = Container.get(MainChartsService);
const wareHouseService = Container.get(WarehouseService);

const ColumnComponent = observer(() => {
  const chartGradient = mainChartsService.chartGradient;
  const gradientThresholds = wareHouseService.gradientThresholds;
  const indexes = wareHouseService.indexes || [];

  const colorConfig: any = {
    kh: {
      range: ["#f7e2a3", "rgb(185, 172, 130)", "rgba(247, 226, 162, 0.5)"],
      threshold1: gradientThresholds.khThreshold1,
      threshold2: gradientThresholds.khThreshold2,
    },
    p: {
      range: ["#dfa29d", "#be8984", "#f8d4d1"],
      threshold1: gradientThresholds.pThreshold1,
      threshold2: gradientThresholds.pThreshold2,
    },
    n: {
      range: ["#c7b6dc", "#8d77a6", "#e4daf1"],
      threshold1: gradientThresholds.nThreshold1,
      threshold2: gradientThresholds.nThreshold2,
    },
  };

  const colorInfo = colorConfig[chartGradient];

  const labelFormatter = (text: number) => {
    const maxLength = 5;
    const textString = text.toString();
    return textString.length > maxLength ? `${textString.slice(0, maxLength)}...` : text;
  };

  const config: any = {
    data: indexes,
    yField: chartGradient,
    xField: "date",
    appendPadding: [12, 12, 12, 12],
    columnStyle: (item: any) => {
      return item[chartGradient] < colorInfo.threshold2 && item[chartGradient] > colorInfo.threshold1
        ? { fill: colorInfo.range[0], cursor: "pointer" }
        : item[chartGradient] >= colorInfo.threshold2
        ? { fill: colorInfo.range[1], cursor: "pointer" }
        : { fill: colorInfo.range[2], cursor: "pointer" };
    },
    label: {
      position: "middle",
      formatter: (text: any) => labelFormatter(text[chartGradient]),
      style: {
        fill: "#000",
      },
    },
    total: false,
    legend: false,
    labelMode: "difference",
  };

  if (!indexes.length) {
    return (
      <div className={styles.emptyContainer}>
        <Empty className={styles.empty} description="Нет данных" />
        <Column height={235} {...config} />;
      </div>
    );
  }

  return <Column height={235} {...config} />;
});

export default ColumnComponent;
