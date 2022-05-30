import React from "react";
import * as ReactDOM from "react-dom/client";
import Routes from "./routes";
import store from "@/redux/store";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
