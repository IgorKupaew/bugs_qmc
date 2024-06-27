export interface IComponentsShift {
  isFirstShift: boolean;
  components: IDispenserComponent[];
}

export interface IDispenserComponent {
  id: string;
  title: string | null;
  humidity: number;
  si2O_Persentage: number;
  al2O3_Persentage: number;
  fe2O3_Persentage: number;
  cao_Percenstage: number;
  mgO_Persentage: number;
  tiO3_Persentage: number;
  cL_Persentage: number;
  sO3_Persentage: number;
  k20_Persentage: number;
  na2O_Persentage: number;
  secondShiftSi2O_Persentage: number;
  secondShiftAl2O3_Persentage: number;
  secondShiftFe2O3_Persentage: number;
  secondShiftCao_Percenstage: number;
  secondShiftMgO_Persentage: number;
  secondShiftTiO3_Persentage: number;
  secondShiftCL_Persentage: number;
  secondShiftSO3_Persentage: number;
  secondShiftK20_Persentage: number;
  secondShiftNa2O_Persentage: number;
  cost: number;
  dutyName: string;
  ts: string;
  shiftNumber: number;
}

export interface IDispenserItem {
  id: string;
  actualSetPoint: number;
  component?: IDispenserComponent | null;
  isWorking: boolean;
  number: number;
  performance: number;
  qmcSetPoint: number;
  shouldBeIncludedToCalc: boolean;
  title: string;
  qmcSetPointLastChange: number;
}

// export interface IDispenserToPutItem {
//   id: string;
//   actualSetPoint: number;
//   component: IDispenserComponent | null;
//   isWorking: boolean;
//   number: number;
//   perfomance: number;
//   qmcSetPoint: number;
//   shouldBeincludedToCalc: boolean;
//   title: string;
// }

export interface IWarehouseItem {
  id: string;
  stackerNumber: number;
  number: number;
  startMeter: number;
  endMeter: number;
  numberOfRows: number;
  numberOfLayers: number;
}

export interface IPile {
  id: string;
  isFull: boolean;
  stackerIsRun: boolean;
  currentFillingMeter: number;
  currentFillingLayer: number;
  currentFillingRow: number;
  stackerNumber: number;
  creationTime: string;
  finishDate: string;
  warehouseNumber: number;
  numberOfRows: number;
  startMeter: number;
  endMeter: number;
  numberOfLayers: number;

  creatorName?: string;
}

export interface IArchivedPile {
  id: string;
  creationTime: string | null;
  finishDate: string | null;
  creatorName: string | null;
  isFull: boolean;
}

export interface IIndexes {
  kh: number;
  p: number;
  n: number;
  date: string;
}

export interface IGradientThresholds {
  khThreshold1: number;
  khThreshold2: number;
  pThreshold1: number;
  pThreshold2: number;
  nThreshold1: number;
  nThreshold2: number;
}

export interface ITrendItem {
  ts: string;
  siO2: number;
  al2O3: number;
  fe2O3: number;
  caO: number;
  mgO: number;
  moisture: number;
  na2O: number;
  clO: number;
  sO3: number;
  tonnage: number;
}
