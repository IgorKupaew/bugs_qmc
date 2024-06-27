import React from "react";

import LeftSide from "./RightSide";
import RightSide from "./LeftSide";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <RightSide />
        <LeftSide />
      </div>
    </header>
  );
};
