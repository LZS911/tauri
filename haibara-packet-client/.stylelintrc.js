module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-prettier'],
  ignoreFiles: [
    // 需要忽略检测的文件类型
    'src/asset/**/*',
    'src/test-lcov-report/**/*',
    'src/asset/**/*.css',
    'node_modules/**/*.less',
    'node_modules/**/*.css',
    '**/*.md',
    '**/*.ts',
    '**/*.tsx',
    '**/*.js',
    'src/styles/font/**/*',
    'src/styles/fonts/**/*',
  ],
  rules: {
    // 关闭规则 null
    'comment-empty-line-before': null,
    'selector-descendant-combinator-no-non-space': null,
    'no-descending-specificity': null,
    'function-comma-newline-after': null,
    'no-missing-end-of-source-newline': null,
    'font-family-no-missing-generic-family-keyword': null,
    'property-no-unknown': [
      // 不允许未知的样式属性
      null,
      {
        ignoreProperties: ['composes', ':global'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      null,
      {
        ignorePseudoClasses: [':global', ':horizontal', ':vertical'],
      },
    ],
    'at-rule-no-unknown': null,
  },
};
