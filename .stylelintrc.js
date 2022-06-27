module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-css-modules',
    'stylelint-config-prettier'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local']
      }
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/[a-zA-Z-]+/']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['constant']
      }
    ],
    'prettier/prettier': true
  },
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less'
    }
  ]
};
