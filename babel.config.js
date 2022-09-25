const env = process.env.NODE_ENV;
const presets = [
  ["@babel/preset-env", { "modules": false, "debug": env === 'development' ? true : false, "useBuiltIns": "usage", "corejs": "3.22.7" }],
  "@babel/preset-typescript",
  "@babel/preset-react",
];

const plugins = [
  ["@babel/plugin-transform-runtime", { "corejs": 3 }],
  // @babel/preset-env 中已经包含了该插件，无需额外引入
  // ["@babel/plugin-proposal-class-properties", { "loose": true }],
  "@babel/plugin-proposal-export-default-from",
  // @babel/preset-env 中已经包含了该插件，无需额外引入
  // "@babel/plugin-proposal-export-namespace-from",
  // @babel/preset-env 中已经包含了该插件，无需额外引入
  // "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-transform-typescript",
  env === 'development' && "react-refresh/babel",
].filter(Boolean);

module.exports = {
  plugins,
  presets,
}
