import { Modal } from "antd";
import React from "react";
import { observer } from "mobx-react-lite";
import Container from "typedi";

import { CurrentPersonService } from "../../services/CurrentPersonService";

import ModalTitle from "./confirmModalTitle";
import ModalFooter from "./ConfirmModalFooter";

import styles from "./ConfirmModal.module.scss";

const currentPersonService = Container.get(CurrentPersonService);

export const ConfirmModal = observer(() => {
  const [name, setName] = React.useState("");
  const personName = currentPersonService.name;
  const changePersonName = currentPersonService.changePersonName.bind(currentPersonService);
  const isModalOpen = currentPersonService.isModalOpen;
  const setIsModalOpen = currentPersonService.changeIsModalOpen.bind(currentPersonService);

  const confirmAction = currentPersonService.confirmAction.bind(currentPersonService);

  const isDisabled = personName.trim() === "";

  const handleCancel = React.useCallback(() => {
    setIsModalOpen(false);
    changePersonName(name);
  }, [setIsModalOpen]);

  const keyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Enter" && !isDisabled) {
        confirmAction();
        setIsModalOpen(false);
      }
    },
    [setIsModalOpen],
  );

  React.useEffect(() => {
    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, [keyDown]);

  React.useEffect(() => {
    if (isModalOpen) {
      setName(personName);
    }
  }, [isModalOpen]);
  return (
    <Modal
      width={464}
      bodyStyle={{ display: "flex", padding: "0 32px 12px 32px" }}
      footer={<ModalFooter isDisabled={isDisabled} />}
      title={<ModalTitle />}
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <input
        required
        autoComplete="on"
        placeholder="Ваше ФИО"
        type="text"
        className={styles.modalInput}
        onChange={(e) => {
          changePersonName(e.target.value);
        }}
        value={personName}
      />
    </Modal>
  );
});
