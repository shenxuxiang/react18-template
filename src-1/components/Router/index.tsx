import React, { Component } from "react";

export const RouterContext = React.createContext({});

export default class Router extends Component<any, any> {
  public unListen: () => void;
  public _isMounted: boolean;
  public _pendingLocation: any;

  constructor(props: any) {
    super(props);
    this.state = {
      location: props.history.location,
    };
    this.unListen = props.history.listen(({ location }) => {
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
    this.unListen();
  }

  render() {
    const context = {
      location: this.state.location,
      history: this.props.history,
    };
    console.log(context, "router");
    return (
      <RouterContext.Provider value={context}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
