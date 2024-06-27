import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Container from "typedi";

import { ReactComponent as ArrowLeft } from "../../assets/icons/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrowRight.svg";

import { WarehouseService } from "../../services/WarehouseService";

import styles from "./ChartsItemButtons.module.scss";

interface IChartsItemButtonsProps {
  inlineStyles?: React.CSSProperties;
}

const warehouseService = Container.get(WarehouseService);

export const ChartsItemButtons = observer(({ inlineStyles = {} }: IChartsItemButtonsProps) => {
  const getIndexesBack = warehouseService.getIndexesBack.bind(warehouseService);
  const getIndexesForward = warehouseService.getIndexesForward.bind(warehouseService);

  return (
    <div style={inlineStyles} className={styles.buttonsContainer}>
      <div onClick={getIndexesBack} className={styles.buttonItem}>
        <ArrowLeft />
      </div>
      <div onClick={getIndexesForward} className={styles.buttonItem}>
        <ArrowRight />
      </div>
    </div>
  );
});
