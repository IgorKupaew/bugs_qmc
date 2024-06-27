import Container from "typedi";
import { observer } from "mobx-react-lite";
import React from "react";

import { CurrentPersonService } from "../../services/CurrentPersonService";

import styles from "./ConfirmModal.module.scss";

const currentPersonService = Container.get(CurrentPersonService);

interface IProps {
  isDisabled: boolean;
}

const ModalFooter = observer(({ isDisabled }: IProps) => {
  const confirmAction = currentPersonService.confirmAction.bind(currentPersonService);

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} disabled={isDisabled} onClick={confirmAction}>
        Подтвердить
      </button>
    </div>
  );
});

export default ModalFooter;
