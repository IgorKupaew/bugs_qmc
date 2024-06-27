import Container from "typedi";

import { TValues } from "./Heatmap";
import HeatmapListreverse from "./HeatmapListreverse";
import HeatmapListUnreverse from "./HeatmapListUnreverse";
import { WarehouseService } from "../../services/WarehouseService";

const warehouseService = Container.get(WarehouseService);

interface IHeatmapListProps {
  endMeter: number;
  startMeter: number;
  direction: "row" | "column";
  numberOfRows: number;
  leftValue: TValues;
  bottomValue: TValues;
  onClick: () => void;
  gradientMode: string;
}
const HeatmapList = ({
  gradientMode,
  endMeter,
  startMeter,
  direction,
  numberOfRows,
  bottomValue,
  onClick,
}: IHeatmapListProps) => {
  const setCurrentLayer = warehouseService.setCurrentLayer.bind(warehouseService);
  const setCurrentRow = warehouseService.setCurrentRow.bind(warehouseService);
  // const setCurrentMeter = warehouseService.setCurrentMeter.bind(warehouseService);
  const getAggregatedComposition = warehouseService.getAggregatedComposition.bind(warehouseService);
  const setIsHeatmapDirty = warehouseService.setIsHeatmapDirty.bind(warehouseService);

  const onClickHandler = (layer: number, row: number) => {
    setCurrentLayer(layer);
    setCurrentRow(row);
    // setCurrentRow(0);
    // setCurrentMeter(0);

    getAggregatedComposition({ layer });
    setIsHeatmapDirty(true);
  };

  const onMeterClickHandler = (meter: number) => {
    // setCurrentMeter(meter);
    // setIsHeatmapDirty(true);
  };
  return (
    <>
      {bottomValue === "Метры" ? (
        <HeatmapListreverse
          endMeter={endMeter}
          startMeter={startMeter}
          direction={direction}
          numberOfRows={numberOfRows}
          onClick={onMeterClickHandler}
          gradientMode={gradientMode}
        />
      ) : (
        <HeatmapListUnreverse
          endMeter={endMeter}
          direction={direction}
          numberOfRows={numberOfRows}
          onClick={onClickHandler}
          gradientMode={gradientMode}
        />
      )}
    </>
  );
};

export default HeatmapList;
