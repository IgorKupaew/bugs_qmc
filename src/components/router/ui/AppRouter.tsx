import React from "react";
import { Route, Routes } from "react-router-dom";

import { routeConfig } from "../../../config/routeConfig/routeConfig";

interface IStacker {
  id: string;
  number: number;
}

interface IAppRouterProps {
  stackers: IStacker[];
}

export const AppRouter = ({ stackers }: IAppRouterProps) => {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }: any) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
