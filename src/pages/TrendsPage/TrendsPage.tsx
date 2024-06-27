import { SegmentedValue } from "antd/lib/segmented";
import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Segmented } from "antd";
import Container from "typedi";

import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { filterByTimestamp } from "./helpers/filterByTimestamp";
import { useDebounce } from "../../hooks/useDebounce";
import { TrendsService } from "../../services/TrendsService";

import { maxMilliseconds } from "./consts";

import { TrendItem } from "./components/TrendItem";
import { trendsList } from "./consts/trendsList";
import { Loader } from "../../components/loader";
import { Empty } from "../../components/empty";

import styles from "./TrendsPage.module.scss";

import { TTrendListItem } from "./types";

const trendsService = Container.get(TrendsService);

const InitValue = maxMilliseconds;

export const TrendsPage = observer(() => {
  const [currentType, setCurrentType] = useState<SegmentedValue>(trendsList[0]);
  const [trendRange, setTrendRange] = useState(InitValue);

  const getAllTrends = trendsService.getAllTrends.bind(trendsService);
  const trends = trendsService.trends;
  const isLoading = trendsService.isLoading;
  const currentDate = trendsService.currentDate;

  const debouncedTrendRage = useDebounce(trendRange, 100);

  useEffect(() => {
    getAllTrends();
  }, [currentDate]);

  const filteredTrends = useMemo(() => {
    return filterByTimestamp(trends, trendRange);
  }, [debouncedTrendRage, trends]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.label}>Данные по трендам оксидов</div>
        <Segmented
          value={currentType}
          onChange={setCurrentType}
          options={trendsList.map((item) => {
            if (item === "moisture") return { label: "Влажность", value: "moisture" };
            if (item === "tonnage") return { label: "Вес", value: "tonnage" };

            return { label: capitalizeFirstLetter(item), value: item };
          })}
        />
      </div>
      {isLoading && <Loader />}
      {!isLoading ? (
        <TrendItem
          trendRange={trendRange}
          setTrendRange={setTrendRange}
          data={filteredTrends}
          type={currentType as TTrendListItem}
        />
      ) : (
        <></>
      )}
    </div>
  );
});
