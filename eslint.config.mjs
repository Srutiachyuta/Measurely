import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["**/*.{jsx,tsx}"], ...(nextVitals.some(config => config.plugins?.["jsx-a11y"]) ? {} : { plugins: { "jsx-a11y": jsxA11y } }), rules: jsxA11y.configs.recommended.rules },
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/role-has-required-aria-props": "error",
    },
  },
  {
    files: ["src/app/admin/**/*.{ts,tsx}", "src/cms/**/*.{ts,tsx}", "src/data/blogs.ts", "src/components/compare/comparison-layout.tsx"],
    rules: { "@typescript-eslint/no-explicit-any": "warn" },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
  {
    files: ["scripts/**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next-*/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
