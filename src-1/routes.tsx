import React, { memo } from "react";
import Route from "./components/Route";
import Router from "./components/Router";
import BrowserRouter from "./components/BrowserRouter";
import Switch from "./components/Switch";

import Home from "./pages/home";
import List from "./pages/list";

function RouterMap(props: any) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/list/:id?" component={List} />
      </Switch>
    </BrowserRouter>
  );
}

export default memo(RouterMap);
