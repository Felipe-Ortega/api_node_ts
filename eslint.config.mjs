// @ts-check
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { 
      globals: globals.node 
    },
    rules: { 
      semi: ["warn", "always"],
      indent: ["error", 2],
      "@typescript-eslint/no-empty-object-type": "off"
    }
  }
];
