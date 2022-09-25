import { pathToRegexp } from "path-to-regexp";

export type MatchPathOptions = {
  path: string;
  strict?: boolean;
  exact?: boolean;
  start?: boolean;
  end?: boolean;
  delimiter?: string;
  sensitive?: boolean;
};

export default function matchPath(pathname: string, options: MatchPathOptions) {
  var { path, exact } = options;
  var paramNames = [];
  var regexp = pathToRegexp(path, paramNames, {});
  var matched = regexp.exec(pathname);

  if (matched === null) return null;

  var values = matched.slice(1);
  var url = matched[0];
  var isExact = url === pathname;

  if (exact && !isExact) return null;

  var params = paramNames.reduce((memo, item, index) => {
    memo[item.name] = values[index];
    return memo;
  }, {});

  return {
    url,
    params,
    path,
    isExact,
  };
}
