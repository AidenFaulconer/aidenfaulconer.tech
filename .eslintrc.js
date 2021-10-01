module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb","eslint-plugin-valtio"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // "linebreak-style": ["warning",process.env.NODE_ENV === 'production' ? "unix" : "windows"],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "no-underscore-dangle": "off",
    "no-mixed-operators": "off",
    "no-nested-ternary": "off",
    "no-unused-vars": "warn",
    "react/prop-types": 0,
    "linebreak-style": 0,
    "no-shadow": "warn",
    "no-tabs": "off",
    "max-len": "off",
  },
}
