import React from "react";
import { observer } from "mobx-react-lite";
import Container from "typedi";

import { ReactComponent as CaretDoubleDownIcon } from "../../../../assets/icons/CaretDoubleDown.svg";
import { CaterPillarService } from "../../../../services/CaterPillarService";
import { AnalyzerService } from "../../../../services/AnalyzerService";

import { classNames } from "../../../../helpers/classnames";
import cls from "./Caterpillar.module.scss";

import { useInterval } from "../../../../hooks/useInterval";
import { toFixed2 } from "../../../../helpers/toFixed2";

interface CaterpillarProps {
  className?: string;
}

const caterPillarService = Container.get(CaterPillarService);
const analyzerService = Container.get(AnalyzerService);

export const Caterpillar = observer(({ className }: CaterpillarProps): JSX.Element => {
  const totalCost = analyzerService.totalActualLinePerf || 0;

  const getCaterPillar = caterPillarService.getCaterPillar;
  const fetchPillar = caterPillarService.getCaterPillar.bind(caterPillarService);

  React.useEffect(() => {
    getCaterPillar();
  }, []);

  useInterval(fetchPillar);

  return (
    <div
      className={classNames(cls.caterpillar, { [cls.static]: totalCost === 0, [cls.dynamic]: totalCost > 0 }, [
        className as string,
      ])}
    >
      <div className={classNames(cls.circleWrapper)}>
        <div
          className={classNames(cls.innerCircle, { [cls.static]: totalCost === 0, [cls.dynamic]: totalCost > 0 }, [])}
        ></div>
      </div>
      <div className={cls.volume}>
        <CaretDoubleDownIcon className={cls.caretIcon} />
        <div className={cls.value}>{toFixed2(totalCost)}</div>
        <div className={cls.desc}>т/час</div>
      </div>
      <div className={cls.circleWrapper}>
        <div
          className={classNames(cls.innerCircle, { [cls.static]: totalCost === 0, [cls.dynamic]: totalCost > 0 }, [])}
        ></div>
      </div>
    </div>
  );
});
