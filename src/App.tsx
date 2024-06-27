import { BrowserRouter } from "react-router-dom";

import { Header } from "./components/header";
import { AppRouter } from "./components/router";
import { ConfirmModal } from "./components/confirmModal";

import stackersConfig from "./stackers-config.json";

import "./styles/customized-antd.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AppRouter stackers={stackersConfig.stackers} />
        <ConfirmModal />
      </div>
    </BrowserRouter>
  );
};

export default App;
