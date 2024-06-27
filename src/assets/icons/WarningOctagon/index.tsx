import React from "react";

import { ReactComponent as WarningOctagonIcon } from "./WarningOctagon.svg";

import styles from "./WarningOctagon.module.scss";

const WarningOctagon = () => {
  return (
    <div className={styles.container}>
      <WarningOctagonIcon />
    </div>
  );
};

export default WarningOctagon;
