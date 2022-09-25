import React, { memo } from "react";
import BrowserRouter from "./components/BrowserRouter";
import Routes from "./components/Routes";
import Route from "./components/Route";
import Home from "./pages/home";
import List from "./pages/list";

function RouterMap(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}>
          <Route path="session" element={<List/>}></Route>
        </Route>
        <Route path="/list/:id/:session" element={<List/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default memo(RouterMap);
