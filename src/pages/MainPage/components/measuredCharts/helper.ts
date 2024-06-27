import { IMeasuredIndexes, IPoints, TPoint } from "../../../../services/MainChartsService";

export interface IChart {
  type: TPoint;
  firstValue: number;
  secondValue: number;
  id: string;
}

export const formatDataForCharts = (measuredIndexes: IMeasuredIndexes, points: IPoints): IChart[] => {
  const result: IChart[] = [];
  result.push({
    type: "kh",
    firstValue: points.kh,
    secondValue: measuredIndexes.kh,
    id: "1",
  });
  result.push({
    type: "p",
    firstValue: points.p,
    secondValue: measuredIndexes.p,
    id: "2",
  });
  result.push({
    type: "n",
    firstValue: points.n,
    secondValue: measuredIndexes.n,
    id: "3",
  });

  return result;
};
