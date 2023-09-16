import "./App.scss";

import React from "react";
import { StatusBar } from "./components";
import { Pages } from "./pages";

export const App: React.FC = () => {
  return (
    <>
      <StatusBar />
      <Pages />
    </>
  );
};
