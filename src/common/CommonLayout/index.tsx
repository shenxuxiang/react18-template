import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './index.module.less';

export default memo((props: any) => {
  return (
    <div className={styles.user_page}>
      <ul className={styles.navigate_header}>
        <li className={styles.navigate_header_item}>
          <NavLink
            to={{ pathname: '/list', search: 'uid=12345', hash: 'session=223' }}
            className={({ isActive }) => {
              return isActive
                ? `${styles.navigate_header_item_a} ${styles.active}`
                : `${styles.navigate_header_item_a}`;
            }}
            replace
          >
            user list
          </NavLink>
        </li>
        <li className={styles.navigate_header_item}>
          <NavLink
            to="/detail"
            className={({ isActive }) => {
              return isActive
                ? `${styles.navigate_header_item_a} ${styles.active}`
                : `${styles.navigate_header_item_a}`;
            }}
          >
            user detail
          </NavLink>
        </li>
      </ul>
      <div className={styles.page_wrapper}>{props.chiwldren}</div>
    </div>
  );
});
