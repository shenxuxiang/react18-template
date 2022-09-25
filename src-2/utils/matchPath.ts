import { pathToRegexp } from 'path-to-regexp';

export default function matchPath(pathname, options) {
  const { exact, path, end, strict } = options;
  const paramNames = [];
  const reg = pathToRegexp(path, paramNames, { end, strict });
  const matched = reg.exec(pathname);
  if (matched === null) return null;

  const values = matched.slice(1);
  const url = matched[0];
  const isExact = url === pathname;
  if (exact && !isExact) return null;
  return {
    path,
    url: path === '/' || path === '' ? '/' : url,
    isExact,
    params: paramNames.reduce((memo: any[], key: any, index: number) => {
      memo[key.name] = values[index];
      return memo;
    }, []),
  };
}

