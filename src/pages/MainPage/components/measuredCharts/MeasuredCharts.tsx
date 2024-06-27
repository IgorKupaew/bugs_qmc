import React from "react";

import Container from "typedi";
import { observer } from "mobx-react-lite";

import { MainChartsService } from "../../../../services/MainChartsService";
import { CurrentPersonService } from "../../../../services/CurrentPersonService";
import { FetchService } from "../../../../services/FetchService";

import { MeasuredChartsFetchComponent } from "./MeasuredChartsFetchComponent";
import ChartsItem from "./ChartsItem";
import { Loader } from "../../../../components/loader";
import { type IChart, formatDataForCharts } from "./helper";

import styles from "./MeasuredCharts.module.scss";

const mainChartsService = Container.get(MainChartsService);
const currentPersonService = Container.get(CurrentPersonService);
const fetchService = Container.get(FetchService);

export const MeasuredCharts = observer(() => {
  const [charts, setCharts] = React.useState<IChart[]>([]);

  const onChange = mainChartsService.pointsOnChange.bind(mainChartsService);
  const setFetchingStatus = fetchService.setFetchStatus.bind(fetchService);
  const isModalOpen = currentPersonService.isModalOpen;
  const points = mainChartsService.points;
  const measuredIndexes = mainChartsService.measuredIndexes;
  const fetchStatus = fetchService.fetchStatus;
  const getMeasuredIndexes = mainChartsService.getMeasuredIndexes.bind(mainChartsService);

  React.useEffect(() => {
    getMeasuredIndexes();
  }, []);
  React.useEffect(() => {
    if (measuredIndexes && points) {
      setCharts(formatDataForCharts(measuredIndexes, points));
    }
  }, [points, measuredIndexes]);

  if (points === null) {
    return (
      <>
        {fetchStatus && <MeasuredChartsFetchComponent />}
        <Loader />
      </>
    );
  }

  return (
    <div className={styles.charts}>
      {charts.map((chart) => (
        <ChartsItem
          fetchStatus={fetchStatus}
          isModalOpen={isModalOpen}
          onChange={onChange}
          setFetchingStatus={setFetchingStatus}
          status="normal"
          type={chart.type}
          secondValue={chart.secondValue}
        />
      ))}
    </div>
  );
});
