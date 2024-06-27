import { Empty } from "antd";

export const NoData = () => {
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ padding: 20, fontSize: 20 }} description="Склад пуст" />;
};
