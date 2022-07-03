import React from "react";
import { RouterContext } from "../Router";
import matchPath from "../../utils/matchPath";

export default function Route(props: any) {
  return (
    <RouterContext.Consumer>
      {(context: any) => {
        const location = props.location || context.location;
        const match = props.computedMatch
          ? props.computedMatch
          : matchPath(location.pathname, { path: props.path, exact: true });

        return match
          ? React.createElement(props.element.type, {
              ...context,
              location,
              match,
            })
          : null;
      }}
    </RouterContext.Consumer>
  );
}
