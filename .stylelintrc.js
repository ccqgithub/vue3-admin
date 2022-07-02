module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-css-modules',
    'stylelint-config-prettier'
  ],
  rules: {
    'prettier/prettier': true
  },
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ]
};
