import WarningOctagon from "../../assets/icons/WarningOctagon";

import styles from "./ConfirmModal.module.scss";

const ModalTitle = () => (
  <div className={styles.modalTitle}>
    <WarningOctagon />
    Подтвердите изменения
  </div>
);

export default ModalTitle;
