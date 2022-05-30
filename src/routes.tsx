import React from 'react';
import { HashRouter, useRoutes } from 'react-router-dom';
import LazyImport from '@/common/LazyImport';
import reducerPageOne from '@/redux/reducers/pageOne';
import reducerPageTwo from '@/redux/reducers/pageTwo';
import './main.less';

const PageOne = LazyImport({ page: 'pageOne', models: { pageOne: reducerPageOne } });
const PageTwo = LazyImport({ page: 'pageTwo', models: { pageTwo: reducerPageTwo } });
const UserList = LazyImport({ page: 'users/userList' });
const UserDetail = LazyImport({ page: 'users/userDetail' });

function RouterMap() {
  return useRoutes([
    { path: '/page-one', element: <PageOne /> },
    { path: '/page-two', element: <PageTwo /> },
    {
      path: '/',
      children: [
        { path: 'list', element: <UserList /> },
        { path: 'detail', element: <UserDetail /> },
      ],
    },
  ]);
}

export default function () {
  return (
    <HashRouter>
      <RouterMap />
    </HashRouter>
  );
}
