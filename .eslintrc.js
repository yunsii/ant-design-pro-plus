module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: { 'no-unused-expressions': 'off' },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
