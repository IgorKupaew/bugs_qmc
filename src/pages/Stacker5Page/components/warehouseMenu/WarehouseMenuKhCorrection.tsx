import React from "react";

import styles from "./WarehouseMenu.module.scss";

const MOCK_khCorrection = [
  { name: "Число слоев", value: 28 },
  { name: "КН на 10 слоев", value: 0.96 },
  { name: "Задание КН общее", value: 0.93 },
  { name: "КН на 4 слоя", value: 0.81 },
];

const WarehouseMenuKhCorrection = () => {
  return (
    <div className={styles.KhCorrection}>
      <div className={styles.KhCorrectionTitle}>Коррекция по KH</div>
      <div className={styles.khCorrectionInputs}>
        {MOCK_khCorrection.map((item) => (
          <div className={styles.khCorrectionInput}>
            <div className={styles.khCorrectionInputLabel}>{item.name}</div>
            <input className={styles.khCorrectionInputValue} type="number" value={item.value} />
          </div>
        ))}
      </div>
      <button className={styles.khCorrectionButton}>Применить уставку</button>
    </div>
  );
};

export default WarehouseMenuKhCorrection;
