import { ITrendItem } from "../../../types";

export const filterByTimestamp = (data: ITrendItem[], milliseconds: number): ITrendItem[] => {
  const currentTime = Date.now();
  const timestampThreshold = currentTime - milliseconds;

  return data.filter((item) => {
    const itemTimestamp = Date.parse(item.ts);
    return itemTimestamp >= timestampThreshold;
  });
};
