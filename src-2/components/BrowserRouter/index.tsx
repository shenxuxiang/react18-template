import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { createBrowserHistory, BrowserHistory } from "history";
import Router from '../Router';

type BrowserRouterProps = {
  basename?: string,
  window?: Window,
  children: React.ReactNode,
}

function BrowserRouter(props: BrowserRouterProps) {
  const historyRef = useRef<any>(null);
  if (!historyRef.current) historyRef.current = createBrowserHistory();
  const { basename = '', children } = props;
  const [ state, setState ] = useState({ action: historyRef.current.action, location: historyRef.current.location });

  useLayoutEffect(() => {
    historyRef.current.listen(function(ref: any) {
      setState(() => ref);
    });
  }, [ historyRef.current ]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      action={state.action}
      history={historyRef.current as BrowserHistory}
    />
  );
}

export default memo(BrowserRouter);
