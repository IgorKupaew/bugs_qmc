import Container from "typedi";
import { Button, Popover } from "antd";

import { TimeRangeSlider } from "../TimeRangeSlider";
import { TrendArea } from "../TrendArea";
import { TrendsButtons } from "../TrendsButtons";

import { maxMilliseconds, minMilliseconds, minusButtons, plusButtons } from "../../consts";

import { TrendsService } from "../../../../services/TrendsService";

import { getFormattedTimeRange } from "../../../../helpers/getFormattedTimeRange";
import { capitalizeFirstLetter } from "../../../../helpers/capitalizeFirstLetter";
import { getFormattedDate } from "../../../../helpers/getFormattedDate";

import { Empty } from "../../../../components/empty";

import styles from "./TrendsItem.module.scss";

import type { ITrendItem } from "../../../../types";
import type { TTrendListItem } from "../../types";

interface IProps {
  type: TTrendListItem;
  data: ITrendItem[];

  trendRange: number;
  setTrendRange: React.Dispatch<React.SetStateAction<number>>;
}

const trendsService = Container.get(TrendsService);

export const TrendItem = ({ type, data, trendRange, setTrendRange }: IProps) => {
  const moveDateByMilliseconds = trendsService.moveDateByMilliseconds.bind(trendsService);
  const currentDate = trendsService.currentDate;

  const onLeftClick = () => {
    moveDateByMilliseconds(trendRange, "back");
  };
  const onRightClick = () => {
    moveDateByMilliseconds(trendRange, "forward");
  };
  const labledType = (() => {
    if (type === "moisture") return "Влажность";
    if (type === "tonnage") return "Вес";

    return capitalizeFirstLetter(type);
  })();

  return (
    <div className={styles.chartsItemContainer}>
      {data.length === 0 && (
        <div className={styles.chartsItemEmpty}>
          <Empty />
        </div>
      )}
      <div className={styles.chartsItemTitle}>
        <h3 className={styles.chartsItemTitleLabel}>
          <span>{labledType}</span>
          <span>Диапазон: {getFormattedTimeRange(trendRange)}</span>
          <span>Выбранное время: {getFormattedDate(currentDate)}</span>
        </h3>
        <div className={styles.changeTimeRangeButton}>
          <Popover
            trigger={["click", "hover"]}
            placement="left"
            content={
              <div>
                <TimeRangeSlider value={trendRange} setValue={setTrendRange} />
                <div>
                  {plusButtons.map((item) => (
                    <Button
                      key={item.value}
                      style={{ width: 90, padding: 0 }}
                      onClick={() =>
                        setTrendRange((prev) => {
                          if (prev + item.value > maxMilliseconds) return maxMilliseconds;

                          return prev + item.value;
                        })
                      }
                    >
                      {item.title}
                    </Button>
                  ))}
                </div>
                <div>
                  {minusButtons.map((item) => (
                    <Button
                      key={item.value}
                      style={{ width: 90, padding: 0 }}
                      onClick={() =>
                        setTrendRange((prev) => {
                          if (prev - item.value <= minMilliseconds) return minMilliseconds;

                          return prev - item.value;
                        })
                      }
                    >
                      {item.title}
                    </Button>
                  ))}
                </div>
              </div>
            }
          >
            <Button>Выбрать диапазон</Button>
          </Popover>
        </div>
      </div>
      <div className={styles.chartsItem}>
        <div className={styles.chartsItem}>
          <TrendsButtons onLeftClick={onLeftClick} onRightClick={onRightClick} />
          <TrendArea type={type} data={data} />
        </div>
      </div>
    </div>
  );
};
