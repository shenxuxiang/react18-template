import React, { memo, useMemo } from 'react';
import { BrowserHistory, Location } from 'history';

type RouterProps = {
  basename: string,
  children: React.ReactNode,
  history: BrowserHistory,
  action: string,
  location: Location,
}
type RouterContext = {
  location: Location,
  history: BrowserHistory,
  action: string,
  basename: string,
}
export const RouterContext = React.createContext({} as RouterContext);
function Router(props: RouterProps) {
  const { basename, children, history, location, action } = props;
  const context = useMemo(() => {
    return {
      location,
      action,
      history,
      basename,
    };
  }, [basename, location, action, history]);

  return (
    <RouterContext.Provider value={context}>
      {children}
    </RouterContext.Provider>
  );
}

export default memo(Router);
