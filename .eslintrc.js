module.exports = {
  "extends": [
    "alloy",
    "alloy/react",
    "alloy/typescript",
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "impliedStrict": true,
    },
  },
  "env": {
    "browser": true,
    "node": true,
    "es2021": true,
  },
  "globals": {
    "fetch": "readonly",
    "Promise": "readonly",
  },
  "rules": {
    "no-global-assign": 2,
    // 不需要给 class 的每个方法和属性添加属性描述符。
    "@typescript-eslint/explicit-member-accessibility": 0,
  },
  "settings": {
    // 添加该配置是为了解决每次运行 lint 检查后，
    // Warning: React version not specified in eslint-plugin-react settings.
    // 添加该配置后，上述问题就可以解决了。
    "react": {
      "version": "detect"
    }
  }
}
