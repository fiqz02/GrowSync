module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"], // Specify TypeScript config files
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files
    "/generated/**/*", // Ignore generated files
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"], // Enforce spacing inside { }
    "no-dupe-keys": "error", // Disallow duplicate keys
    "max-len": ["error", { "code": 120 }],
  },
  overrides: [
    {
      files: ["*.js"], // Apply these settings to .js files only
      parserOptions: {
        project: null, // Exclude .js files from TypeScript linting
      },
      rules: {
        "@typescript-eslint/no-var-requires": 0, // Allow require statements in .js files
      },
    },
  ],
};
