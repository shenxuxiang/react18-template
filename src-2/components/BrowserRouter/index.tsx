import React, { useState, useRef, useLayoutEffect } from "react";
import { createBrowserHistory } from "history";
import Router from "../Router";

export default function BrowserRouter(props: any) {
  const { window, children } = props;
  const historyRef = useRef<any>();

  if (!historyRef.current) {
    historyRef.current = createBrowserHistory({ window });
  }

  const history = historyRef.current;

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return React.createElement(Router, {
    location: state.location,
    navigationType: state.action,
    navigator: history,
    children,
  });
}
