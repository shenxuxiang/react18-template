import React, { Component } from 'react';
import matchPath from '../utils/matchPath';
import { RouterContext } from './Router';

export default class Switch extends Component<any, any> {
  render() {
    return (
      <RouterContext.Consumer>
        {
          (context: any) => {
            var location = context.location;
            var element = null;
            var match = null;

            React.Children.forEach(this.props.children, (child) => {
              if (match === null) {
                match = matchPath(location.pathname, child.props);
                element = child;
              }
            });

            if (match) {
              return React.cloneElement(element, { computedMatch: match, location });
            }

            return null;
          }
        }
      </RouterContext.Consumer>
    )
  }
}
