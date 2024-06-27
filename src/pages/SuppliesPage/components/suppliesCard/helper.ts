import { IDispenserItem } from "../../../../types";
import { getFormatedSubstanceName } from "../../../../helpers/substanceNamesFormatter";
import { ReactNode } from "react";

interface tableDataItem {
  type: any;
  value: number;
  unit: string;
  name: string;
  id: string;
}
export const suppliesTableDataFormater = (el: IDispenserItem, shiftComponent: boolean): tableDataItem[] => {
  return [
    {
      id: el.id,
      type: getFormatedSubstanceName("SiO2"),
      value: (shiftComponent ? el?.component?.si2O_Persentage : el?.component?.secondShiftSi2O_Persentage) || 0,
      unit: "%",
      name: "si2O_Persentage",
    },
    {
      id: el.id,
      type: getFormatedSubstanceName("Al2O3"),
      value: (shiftComponent ? el?.component?.al2O3_Persentage : el.component?.secondShiftAl2O3_Persentage) || 0,
      unit: "%",
      name: "al2O3_Persentage",
    },
    {
      id: el.id,
      type: getFormatedSubstanceName("Fe2O3"),
      value: (shiftComponent ? el?.component?.fe2O3_Persentage : el.component?.secondShiftFe2O3_Persentage) || 0,
      unit: "%",
      name: "fe2O3_Persentage",
    },
    {
      id: el.id,
      type: "Cao",
      value: (shiftComponent ? el?.component?.cao_Percenstage : el.component?.secondShiftCao_Percenstage) || 0,
      unit: "%",
      name: "cao_Percenstage",
    },
    {
      id: el.id,
      type: "MgO",
      value: (shiftComponent ? el?.component?.mgO_Persentage : el.component?.secondShiftMgO_Persentage) || 0,
      unit: "%",
      name: "mgO_Persentage",
    },
    {
      id: el.id,
      type: getFormatedSubstanceName("TiO3"),
      value: (shiftComponent ? el?.component?.tiO3_Persentage : el.component?.secondShiftTiO3_Persentage) || 0,
      unit: "%",
      name: "tiO3_Persentage",
    },
    {
      id: el.id,
      type: "Cl",
      value: (shiftComponent ? el?.component?.cL_Persentage : el.component?.secondShiftCL_Persentage) || 0,
      unit: "%",
      name: "cL_Persentage",
    },
    {
      id: el.id,
      type: getFormatedSubstanceName("SO3"),
      value: (shiftComponent ? el?.component?.sO3_Persentage : el.component?.secondShiftSO3_Persentage) || 0,
      unit: "%",
      name: "sO3_Persentage",
    },
    // {
    //   id: el.id,
    //   type: "Влажность",
    //   value: el?.component?.humidity || 0,
    //   unit: "%",
    //   name: "humidity",
    // },
  ];
};
export const selectorOptions = [
  {
    value: "SP Глина", // TODO: откуда брать, что такое SP
    label: "SP Глина",
  },
  {
    value: "SP Мел",
    label: "SP Мел",
  },
  {
    value: "SP Кварциты",
    label: "SP Кварциты",
  },
  {
    value: "SP Огарки",
    label: "SP Огарки",
  },
];
