import pathToRegexp from 'path-to-regexp';

type Opts = {
  path: string;
  [propName: string]: any
}

export default function matchPath(pathname: string, options: Opts) {
  const { path, exact } = options;
  const keys = [];
  const regexp = pathToRegexp(path, keys, { exact });
  const match = regexp.exec(pathname);

  if (match == null) return null;

  const url = match[0];
  const values = match.slice(1);

  const isExact = url === pathname;

  if (exact && !isExact) return null;

  return {
    path,
    url: path === '/' && url === '' ? '/' : url,
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}),
  };
}
