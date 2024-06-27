import { observer } from "mobx-react-lite";
import Container from "typedi";

import { MainChartsService } from "../../../../services/MainChartsService";
import { useInterval } from "../../../../hooks/useInterval";

const mainChartsService = Container.get(MainChartsService);

interface IFetchComp {
  type?: string;
}

export const MeasuredChartsFetchComponent = observer(({ type }: IFetchComp) => {
  const getMeasuredIndexes = mainChartsService.getMeasuredIndexes.bind(mainChartsService);
  const getPoints = mainChartsService.getPoints.bind(mainChartsService);

  useInterval(() => getMeasuredIndexes(type));
  useInterval(getPoints);

  return null;
});
