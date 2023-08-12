module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: ['@dvdevcz/eslint-config-typescript'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    ignorePatterns: ['vite.config.js'],
    settings: {
        'import/resolver': {
            typescript: {
                alias: true,
            },
        },
    },
};
