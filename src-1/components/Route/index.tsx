import React, { Component } from "react";
import { RouterContext } from "../Router";
import matchPath from "../../utils/matchPath";

export default class Route extends Component<any, any> {
  render() {
    return (
      <RouterContext.Consumer>
        {(context: any) => {
          const match = this.props.computedMatch
            ? this.props.computedMatch
            : matchPath(context.location, this.props as any);

          const props = { ...context, location, match };
          return match
            ? React.createElement(this.props.component, props)
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
