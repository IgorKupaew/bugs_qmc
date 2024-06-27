import { useEffect, useRef } from "react";
import Container from "typedi";

import { WarehouseService } from "../../../services/WarehouseService";

const warehouseService = Container.get(WarehouseService);

interface IReturn {
  ref: React.RefObject<HTMLDivElement>;
}

export const useHeatmapHeight = (): IReturn => {
  const setHeatmapSize = warehouseService.setHeatmapSize.bind(warehouseService);
  const heatmapSize = warehouseService.heatmapSize;
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapper.current) {
      const height = wrapper.current.offsetHeight;

      if (!heatmapSize || height > heatmapSize) {
        setHeatmapSize(height);
        return;
      }

      if (height < heatmapSize) {
        wrapper.current.style.height = `${heatmapSize}px`;
      }
    }
  }, [heatmapSize, setHeatmapSize]);

  return { ref: wrapper };
};
