import React from "react";

import SettingsIcon from "../../../assets/icons/Settings";

import styles from "../header.module.scss";

const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <SettingsIcon />
    </div>
  );
};

export default Settings;
