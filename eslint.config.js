import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

export default [
    js.configs.recommended,
    prettierConfig,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                // Node.js globals
                console: "readonly",
                process: "readonly",
                URL: "readonly",
                // Browser globals
                document: "readonly",
                window: "readonly",
                fetch: "readonly",
                alert: "readonly",
                confirm: "readonly",
                HTMLElement: "readonly",
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
        },
    },
];
