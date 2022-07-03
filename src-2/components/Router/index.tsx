import React from "react";

export const RouterContext = React.createContext({});

export default function Router(props: any) {
  const { location, navigationType, navigator, children } = props;

  return (
    <RouterContext.Provider
      value={{
        navigator,
        navigationType,
        location,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}
