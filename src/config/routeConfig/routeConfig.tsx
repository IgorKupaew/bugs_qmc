import { AnalysisPage } from "../../pages/AnalysisPage";
import { MainPage } from "../../pages/MainPage";
import { SuppliesPage } from "../../pages/SuppliesPage";
import { Stacker5Page } from "../../pages/Stacker5Page";
import { TrendsPage } from "../../pages/TrendsPage";

import stackersConfig from "../../stackers-config.json";

export const AppRoutes: any = {
  MAIN: "main",
  SUPPLIES: "supplies",
  ANALYSIS: "analysis",
  TRENDS: "trends",
};

export const RoutePath: any = {
  [AppRoutes.MAIN]: "/",

  [AppRoutes.SUPPLIES]: "/supplies",
  [AppRoutes.ANALYSIS]: "/analysis",
  [AppRoutes.TRENDS]: "/trends",
};

export const routeConfig: any = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.SUPPLIES]: {
    path: RoutePath.supplies,
    element: <SuppliesPage />,
  },
  [AppRoutes.ANALYSIS]: {
    path: RoutePath.analysis,
    element: <AnalysisPage />,
  },
  [AppRoutes.TRENDS]: {
    path: RoutePath.trends,
    element: <TrendsPage />,
  },
};

stackersConfig.stackers.forEach((item) => {
  AppRoutes[`STACKER${item.number}`] = `stacker${item.number}`;
  RoutePath[AppRoutes[`STACKER${item.number}`]] = `/stacker${item.number}`;
  routeConfig[AppRoutes[`STACKER${item.number}`]] = {
    path: RoutePath[AppRoutes[`STACKER${item.number}`]],
    element: <Stacker5Page />,
  };
});
