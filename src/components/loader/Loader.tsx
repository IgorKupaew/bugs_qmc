import { Spin } from "antd";

import styles from "./Loader.module.scss";

interface ILoaderProps {
  size?: "small" | "large" | "default";
}

export const Loader = ({ size = "large" }: ILoaderProps) => {
  return (
    <div className={styles.loaderContainer}>
      <Spin size={size} />
    </div>
  );
};
