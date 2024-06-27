import React from "react";

import { Title } from "./Title";
import { Table } from "./Table";
import { ReactComponent as Atom } from "../../../../assets/icons/Atom.svg";

import styles from "./InlineAnalyzer.module.scss";

export const InlineAnalyzer = () => {
  return (
    <div className={styles.container}>
      <Title />
      <Table />
      <div className={styles.footerWrapper}>
        <div className={styles.cardFooter}>
          <Atom />
        </div>
      </div>
    </div>
  );
};
