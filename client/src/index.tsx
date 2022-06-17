import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store from "./store/store";
import "antd/dist/antd.css";
import "./css/global.css";
import { BrowserRouter as Router } from "react-router-dom";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </Router>
);
