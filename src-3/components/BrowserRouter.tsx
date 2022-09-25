import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import Router from './Router';

export default class extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: createBrowserHistory(props),
    };
  }

  render() {
    return <Router history={this.state.history} children={this.props.children} />
  }
}
