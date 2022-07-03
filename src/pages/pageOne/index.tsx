import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import actions from '@/redux/actions/pageOne';
import Icon from '@/components/Icon';
import styles from './index.module.less';
import Foo from './Foo';

const mapStateToProps = (state: any) => {
  return state.pageOne;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
};

class PageOne extends PureComponent<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    this.props
      .queryTaskDetail({
        taskId: '03344952231',
        taskName: '导购所属门店更换',
        taskStatus: 1,
        msg: '成功',
      })
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
        <h2
          className={styles.page_title}
          onClick={() => {
            this.setState((prevState: any) => ({ count: prevState.count + 1 }))
          }}
        >
          hello world page one-{this.state.count}
        </h2>
        <div>hellow page one</div>
        <Icon type="tongcheng" style={{ fontSize: 50 }} />
        <Icon type="peisong" style={{ fontSize: 40 }} />
        <Icon type="checkbox-hollow" style={{ fontSize: 30 }} />
        <Icon type="douyin" style={{ fontSize: 20 }} />
        <Icon type="alipay" />
        <Icon type="kuaishou" />
        <Icon type="baidu" />
        <Icon type="xiaohongshu" />
        <Icon type="checkbox" />
        <Foo></Foo>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageOne);
