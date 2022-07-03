import React from "react";
import matchPath from "../../utils/matchPath";
import { RouterContext } from "../Router";

export default function Routes(props: any) {
  return (
    <RouterContext.Consumer>
      {(context: any) => {
        const location = context.location;
        let match = null;
        let element = null;

        React.Children.forEach(props.children, (child) => {
          if (match == null) {
            match = matchPath(location.pathname, {
              path: child.props.path,
              exact: true,
            });
            element = child;
          }
        });
        return match
          ? React.cloneElement(element, {
              location,
              computedMatch: match,
            })
          : null;
      }}
    </RouterContext.Consumer>
  );
}
