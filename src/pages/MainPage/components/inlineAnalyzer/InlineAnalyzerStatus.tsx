import { Tooltip } from "antd";

import { ReactComponent as OkIcon } from "../../../../assets/icons/statusOk.svg";

import { getColoredCircle } from "../../../../helpers/getColoredCircle";
import { getSlicedString } from "../../../../helpers/getSlicedString";

import styles from "./InlineAnalyzer.module.scss";

interface IProps {
  title: string;
  isOk: boolean;
}

const InlineAnalyzerStatus = ({ isOk, title }: IProps) => {
  if (title === "") return <></>;

  if (isOk) {
    return (
      <div className={styles.titleStatus}>
        <OkIcon />
        <span>Ошибок нет</span>
      </div>
    );
  }

  return (
    <div className={styles.titleStatus + " " + styles.error}>
      {getColoredCircle("red", 5)}
      <Tooltip title={title}>
        <span className={styles.statusTitleText}>{getSlicedString(title)}</span>
      </Tooltip>
    </div>
  );
};

export default InlineAnalyzerStatus;
