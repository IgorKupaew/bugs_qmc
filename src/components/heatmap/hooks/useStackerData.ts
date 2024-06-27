import { useMemo } from "react";
import Container from "typedi";

import { WarehouseService } from "../../../services/WarehouseService";

const warehouseService = Container.get(WarehouseService);

interface IReturn {
  isStackerExist: boolean;
  stackerData: {
    layer: number;
    row: number;
    meter: number;
  };
}

export const useStackerData = (): IReturn => {
  const stackerInStore = warehouseService.stacker;
  const compositions = warehouseService.compositions;
  const currentArchiveId = warehouseService.currentArchiveId;

  const isStackerExist =
    currentArchiveId === null &&
    stackerInStore.layer !== -1 &&
    stackerInStore.meter !== -1 &&
    stackerInStore.row !== -1;

  const stackerData = useMemo(() => {
    if (stackerInStore.layer === -1 || stackerInStore.meter === -1 || stackerInStore.row === -1) {
      const computedStackerValues = { layer: 0, meter: 0, row: 0 };

      compositions.forEach(({ layer, meter_group, row }) => {
        if (layer > computedStackerValues.layer) computedStackerValues.layer = layer;
        if (meter_group > computedStackerValues.meter) computedStackerValues.meter = meter_group;
        if (row > computedStackerValues.row) computedStackerValues.row = row;
      });

      return computedStackerValues;
    }
    return stackerInStore;
  }, [compositions, stackerInStore]);

  return { isStackerExist, stackerData };
};
