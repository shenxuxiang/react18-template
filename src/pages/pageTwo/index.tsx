import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import actions from '@/redux/actions/pageTwo';
import styles from './index.module.less';

const mapStateToProps = (state: any) => {
  return state.pageTwo;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
};

class PageTwo extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props
      .queryPageInfo()
      .then((data: any) => {
        console.log(data, 'response');
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={styles.page}>
        <h2>hello world page two</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTwo);
