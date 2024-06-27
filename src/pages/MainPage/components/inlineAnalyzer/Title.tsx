import { observer } from "mobx-react-lite";
import Container from "typedi";

import { ReactComponent as TimeIcon } from "../../../../assets/icons/time.svg";

import { AnalyzerService } from "../../../../services/AnalyzerService";
import InlineAnalyzerStatus from "./InlineAnalyzerStatus";
// import { toFixed2 } from "../../../../helpers/toFixed2";
// import { getColoredCircle } from "../../../../helpers/getColoredCircle";

import styles from "./InlineAnalyzer.module.scss";

const analyzerService = Container.get(AnalyzerService);

export const Title = observer(() => {
  const ts = analyzerService.ts;

  const status = analyzerService.analizerStatus;
  // const moisture = analyzerService.moisture;

  return (
    <div className={styles.title}>
      <div className={styles.titleText}>Поточный анализатор</div>
      <div className={styles.titleTime}>
        <TimeIcon />
        <span>{ts}</span>
      </div>
      {/* {moisture && (
        <div className={styles.titleMoisture}>
          <span className={styles.moistureLabel}>{getColoredCircle("gray", 5)}Влажность:</span>{" "}
          <span>{toFixed2(moisture)}</span>
        </div>
      )} */}
      <InlineAnalyzerStatus title={status} isOk={status === "Нормальная работа установки"} />
    </div>
  );
});
