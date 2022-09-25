import React, { memo, useContext, useLayoutEffect, useState } from 'react';
import { RouterContext } from '../Router';
import matchPath from '../../utils/matchPath';
import { resolvePath } from '../../utils';

function Routes(props: any) {
  const { children } = props;
  const [ element, setElement ] = useState<any>(null);
  const context = useContext(RouterContext);
  const { location, basename } = context;

  useLayoutEffect(() => {
    function createRoutesFromChildren(children: any) {
      const routes = [] as any[];
      React.Children.forEach(children, child => {
        const route = {
          path: child.props.path,
          element: child.props.element,
          children: [] as any[],
        };

        if (child.props.children) route.children = createRoutesFromChildren(child.props.children);
        routes.push(route);
      });
      return routes;
    }
    const routes = createRoutesFromChildren(children);
    function getRenderContent(routes: any[], basename: string) {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const match = matchPath(location.pathname, {
          path: resolvePath(basename, route.path),
          end: false,
          strict: false,
        });
        if (match) {
          const children = route.children ? getRenderContent(route.children, match.path) : null;
          return React.cloneElement(route.element, { ...context, match, children });
        }
      }
      return null;
    }
    setElement(() => getRenderContent(routes, basename));
  }, [children, location, basename]);

  return element;
}

export default memo(Routes);
