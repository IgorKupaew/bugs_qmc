import styles from "./Heatmap.module.scss";

interface ILeftLineRowProps {
  numberOfRows: number;
  direction: "row" | "column";
}

const LeftLineRow = ({ numberOfRows, direction }: ILeftLineRowProps) => {
  if (direction === "column") {
    return (
      <div className={styles.leftRow}>
        {new Array(numberOfRows).fill(null).map((_, index) => {
          let i = index;
          if (i === 1) {
            return <div className={styles.leftRowValue}>{1}</div>;
          }
          return i % 2 === 0 ? <div className={styles.leftRowValue}>{i}</div> : null;
        })}
      </div>
    );
  }
  return (
    <div className={styles.leftRow}>
      <div className={styles.leftRowValue}>{1}</div>
      {new Array(numberOfRows).fill(null).map((_, index) => {
        const i = index + 1;
        return i % 4 === 0 ? <div className={styles.leftRowValue}>{i === 0 ? 1 : i}</div> : null;
      })}
    </div>
  );
};

export default LeftLineRow;
