import React, { Component } from 'react';
import matchPath, { MatchPathOptions } from '../utils/matchPath';
import { RouterContext } from './Router';

type IProps = {
  children?: any;
  component?: React.FunctionComponent | React.ComponentClass;
  render?: Function;
  computedMatch?: any;
  location?: any;
  match?: any;
} & MatchPathOptions;

export default class Route extends Component<IProps, any> {
  render() {
    return (
      <RouterContext.Consumer>
        {
          (context: any) => {
            var props = this.props;
            var location = context.location;

            var match = props.computedMatch ? props.computedMatch : matchPath(location.pathname, props);
            props = {...context, match};console.log(context, 'route');

            return match === null ? null : React.createElement(this.props.component, props);
          }
        }
      </RouterContext.Consumer>
    );
  }
}
