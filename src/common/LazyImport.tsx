import React, { useState, useLayoutEffect } from 'react';
import { useLocation, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { AnyAction, combineReducers } from 'redux';
import store from '@/redux/store';
import { main } from '@/redux/reducers';

type ComponentType = React.FunctionComponent | React.ComponentClass;
type Reducer = (state: any, action: AnyAction) => any;
interface LazyArguments {
  page: string;
  models?: {
    [propName: string]: Reducer;
  };
}

export default function LazyImport({ page, models }: LazyArguments) {
  return function (props: any) {
    const [state, setState] = useState<ComponentType | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = useSearchParams(location.search);
    const params = useParams();

    useLayoutEffect(() => {
      import('@/pages/' + page).then((response: any) => {
        const reducer = combineReducers({ main, ...models });
        store.replaceReducer(reducer);
        setState(() => response.default);
      });
    }, []);

    const Comp = state;

    if (Comp === null) return <div>loading...</div>;
    return <Comp {...props} location={location} navigate={navigate} searchParams={searchParams} params={params} />;
  };
}
