module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'refactor',
        'test',
        'build',
        'ci',
        'perf',
        'style',
        'revert',
      ],
    ],
    // Permitimos mayúsculas en el subject (e.g., nombres propios)
    'subject-case': [0],
    // URLs y párrafos largos permitidos en el body
    'body-max-line-length': [0],
  },
};