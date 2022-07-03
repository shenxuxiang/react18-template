import React, { Component } from "react";
import { RouterContext } from "../Router";
import matchPath from "../../utils/matchPath";

export default class Switch extends Component<any, any> {
  render() {
    return (
      <RouterContext.Consumer>
        {(context: any) => {
          const { location } = context;

          let match = null;
          let element = null;

          React.Children.forEach(this.props.children, (child) => {
            if (match == null) {
              element = child;
              match = matchPath(location.pathname, child.props);
            }
          });

          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
