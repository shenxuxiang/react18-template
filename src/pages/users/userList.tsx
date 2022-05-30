import React, { PureComponent } from 'react';
import CommonLayout from '@/common/CommonLayout';

export default class UserList extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <CommonLayout>
        <div onClick={this.handleClick}>{this.state.count}</div>
        <div
          onClick={() => {
            this.props.navigate('/page-one');
          }}
        >
          to page one
        </div>
        <div
          onClick={() => {
            this.props.navigate({ pathname: '/page-two', hash: 'session=12345', search: 'id=1&sex=2&name=3' });
          }}
        >
          to pagetwo
        </div>
      </CommonLayout>
    );
  }
}
