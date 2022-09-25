import React, { Component } from 'react';

export const RouterContext = React.createContext({});

export default class Router extends Component<any, any> {
  public unlisten: () => void;
  public _isMounted: boolean;
  public _pendingLocation: any;

  constructor(props: any) {
    super(props);
    this.state = {
      location: props.history.location,
    };

    this.unlisten = props.history.listen((location: any) => {
      if (this._isMounted) {
        this.setState({ location });
      } else {
        this._pendingLocation = location;
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation });
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    var value = {
      location: this.state.location,
      history: this.props.history,
    };
    return (
      <RouterContext.Provider value={value} children={this.props.children} />
    );
  }
}
