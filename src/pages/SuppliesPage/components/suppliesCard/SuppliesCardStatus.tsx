import React from "react";

import styles from "./SuppliesCard.module.scss";
import { Radio, RadioChangeEvent } from "antd";

const SuppliesCardStatus = () => {
  const [value, setValue] = React.useState(1);

  const onChange = React.useCallback((e: RadioChangeEvent): void => {
    setValue(e.target.value);
  }, []);

  return (
    <div className={styles.cardStatusContainer}>
      {/* <div className={styles.cardStatusTitle}>Стоимость сырья</div>
      <div className={styles.cardStatusList}>
        <Radio.Group onChange={onChange} value={value}>
          <Radio className={styles.cardStatusLabel} value={1}>
            Бесплатно
          </Radio>
          <Radio className={styles.cardStatusLabel} value={2}>
            Дешево
          </Radio>
          <Radio className={styles.cardStatusLabel} value={3}>
            Дорого
          </Radio>
        </Radio.Group>
      </div> */}
    </div>
  );
};

export default SuppliesCardStatus;
