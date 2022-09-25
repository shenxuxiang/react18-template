import React, { PureComponent } from 'react';
import styles from './index.module.less';

type QuryGoodsListOptions = { pageNum: number, pageSize: number };

function throttle(fn: Function, delay: number) {
  let timer: number | null = null;
  return (...args: any[]) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  }
}

function getScrollTop (element?: HTMLElement) {
  if (element) {
    return element.scrollTop;
  } else {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }
}
// 虚拟列表
export default class VirtualGoodsList extends PureComponent<any, any> {
  public onScroll: () => void;
  // 屏幕可视区的高度
  public clientHeight: number;
  // 每个商品的高度
  public itemHeight: number;
  // 可视区可展示商品的数量
  public viewPortCount: number;
  // 原先记录的 start 的值
  public oldStart: number;
  // 缓冲区可放置商品的数量。
  // 设置缓冲区的目的是为了避免滑动过快时出现白屏的现象。
  public bufferSize: number;
  // 向服务器请求数据，是否还有更多的数据可请求
  public hasMore: boolean;
  // 是否正在项服务器请求数据
  public loading: boolean;
  // 距离底部多少像素时触发加载数据功能
  public bottomThreshold: number;

  constructor(props: any) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: props.pageSize,
      loading: false,
      start: 0,
      end: props.pageSize,
      goodsList: [] as any[],
      totalCount: 0,
      totalHeight: 0,
      offsetTop: 0,
    };

    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    this.itemHeight = 0;
    this.viewPortCount = 10;
    this.onScroll = throttle(this.handleScroll, 80);
    this.oldStart = 0;
    this.bufferSize = 10;
    this.hasMore = true;
    this.loading = false;
    this.bottomThreshold = 100;
  }


  queryGoodsList = (query: QuryGoodsListOptions) => {
    const { pageNum, pageSize } = query;
    this.setState({ loading: true });
    this.props.queryGoodsList({ pageNum, pageSize })
      .then((response: any) => {
        const { list, pageNum, total } = response;
        const goodsList = this.state.goodsList.concat(list);
        this.hasMore = list.length >= pageSize ? true : false;
        this.loading = false;
        this.setState({
          loading: false,
          goodsList,
          pageNum,
          totalCount: total,
          totalHeight: Math.ceil(goodsList.length / 2) * this.itemHeight,
        }, () => {
          if (this.itemHeight) return;
          const goodsListItem: HTMLElement | null = document.querySelector('.goods-list-item');
          if (goodsListItem) {
            let height = Number(window.getComputedStyle(goodsListItem, null).height?.slice(0, -2));
            this.itemHeight = Number(height.toFixed(1));
            this.viewPortCount = Math.ceil(this.clientHeight / this.itemHeight) * 2;
            this.setState({ totalHeight: Math.ceil(goodsList.length / 2) * this.itemHeight });
          }
        });
      });
  }

  // 上拉加载更多数据
  handleLoadMore = (scrollTop: number) => {
    if (!this.hasMore || this.loading) return;

    const SH = document.documentElement.scrollHeight;
    if (scrollTop + this.clientHeight + this.bottomThreshold >= SH) {
      this.loading = true;
      const { pageSize, pageNum } = this.state;
      this.queryGoodsList({ pageNum: pageNum + 1, pageSize });
    }
  }

  // 滚动事件
  handleScroll = () => {
    const scrollTop = getScrollTop();
    const { totalCount } = this.state;
    this.handleLoadMore(scrollTop);
    // 计算虚拟列表开始的位置
    // 滚动的距离除以商品的高度，得出当前滚动位置可放置多少个商品。还要减去缓冲区的大小。
    let start = Math.floor(scrollTop / this.itemHeight) * 2 - this.bufferSize;
    start = start <= 0 ? 0 : start;

    // 节流，避免无谓的更新。
    if (this.oldStart === start) return;
    this.oldStart = start;

    let end = start + this.bufferSize + this.viewPortCount + this.bufferSize;
    end = end >= totalCount ? totalCount : end;

    // offsetTop 的高度表示第一个虚拟列表距离顶部的距离。
    const offsetTop = start / 2 * this.itemHeight;
    this.setState({ start, end, offsetTop });
  }

  componentDidMount() {
    const { pageSize, pageNum } = this.state;
    this.queryGoodsList({ pageNum, pageSize });
    window.addEventListener('scroll', this.onScroll, false);
  }

  render() {
    const { goodsList, start, end, totalHeight, loading, offsetTop } = this.state;
    return (
      <>
        <div className={styles.goods_list} style={{ height: totalHeight }}>
          {/* 使用一个div元素占位 */}
          <div style={{ width: '100%', height: offsetTop }}></div>
          {
            goodsList.slice(start, end).map((item: any, index: number) =>
              <div className={`${styles.goods_list_item} goods-list-item`} key={item.id}>
                <div className={styles.goods_list_item_con}>
                  <img src={item.avatar} alt="goods-image" className={styles.goods_list_item_con_img}/>
                  <div className={styles.goods_list_item_con_msg}>{start + index + 1}-:{item.message}</div>
                </div>
              </div>
            )
          }
        </div>
        <div className={styles.loading}>
          <span className={styles.loading_text}>
            {loading ? '努力加载中' : '上拉加载更多数据'}
          </span>
        </div>
      </>
    );
  }
}
