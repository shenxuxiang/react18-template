import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import actions from '@/redux/actions/pageTwo';
import styles from './index.module.less';
import goodsList from './data';
import VirtualGoodsList from '@/components/VirtualGoodsList';

type QuryGoodsListOptions = { pageNum: number, pageSize: number };

function queryGoodsList(query: QuryGoodsListOptions) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { pageNum, pageSize } = query;
      const start = (pageNum - 1) * pageSize;
      const end = pageNum * pageSize;
      const list = goodsList.slice(start, end);
      return resolve({
        list,
        pageNum,
        total: goodsList.length,
      });
    }, 200);
  });
}

const mapStateToProps = (state: any) => {
  return state.pageTwo;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actions, dispatch);
};

class PageTwo extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={styles.page}>
        <VirtualGoodsList
          queryGoodsList={queryGoodsList}
          pageSize={30}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTwo);
