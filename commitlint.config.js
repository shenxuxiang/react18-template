module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'header-case': [2, 'always', 'lower-case'],
    'type-enum': [2, 'always', ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-empty': [1, 'always'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', ['lower-case']],
    'body-leading-blank': [2, 'always'],
    'body-empty': [1, 'always'],
    'body-case': [2, 'always', 'lower-case'],
    'footer-leading-blank': [2, 'always'],
    'footer-empty': [1, 'always'],
  },
}
