import React from "react";

import ChoosePeriod from "./ChoosePeriod";
import ChooseType from "./ChooseType";
import HeaderTitle from "./HeaderTitle";

import styles from "./Deviations.module.scss";

const DeviationsHeader = () => {
  return (
    <div className={styles.deviationsHeader}>
      <HeaderTitle />
      <ChoosePeriod />
      <ChooseType />
    </div>
  );
};

export default DeviationsHeader;
