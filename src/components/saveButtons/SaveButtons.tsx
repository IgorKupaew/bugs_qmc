import React from "react";

import styles from "./SaveButtons.module.scss";

interface ISaveButtonsProps {
  onSave: any;
  onCancel: any;
}

export const SaveButtons = ({ onSave, onCancel }: ISaveButtonsProps) => {
  return (
    <div className={styles.buttons}>
      <button onClick={onCancel} className={styles.buttonCancel}>
        Отменить
      </button>
      <button onClick={onSave} className={styles.buttonConfirm}>
        Сохранить
      </button>
    </div>
  );
};
