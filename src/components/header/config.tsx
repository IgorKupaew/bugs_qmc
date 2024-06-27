/* eslint-disable */
import { MenuProps } from "antd";

import HandPointingIcon from "../../assets/icons/HandPointingIcon";
import LightingIcon from "../../assets/icons/LightingIcon";
import { AppRoutes } from "../../config/routeConfig/routeConfig";
import stackersConfig from "../../stackers-config.json";

export const navLinks: any = {
  [AppRoutes.MAIN]: "Главная",
};

stackersConfig.stackers.forEach((item) => {
  navLinks[AppRoutes[`STACKER${item.number}`]] = `Склад №${item.number}`;
});

navLinks[AppRoutes.SUPPLIES] = "Питатели";
navLinks[AppRoutes.ANALYSIS] = "Анализ";
navLinks[AppRoutes.TRENDS] = "Тренды";

export const items: MenuProps["items"] = [
  {
    label: "Ручной",
    key: "handle",
    icon: <HandPointingIcon />,
  },
  {
    label: "Автоматический",
    key: "auto",
    icon: <LightingIcon />,
  },
];

export type TWorkModes = "handle" | "auto";

export const switchButtonsHeaderItems = [
  { label: "Ручной", key: "handle", icon: <HandPointingIcon /> },
  { label: "Автоматический", key: "auto", icon: <LightingIcon /> },
];
