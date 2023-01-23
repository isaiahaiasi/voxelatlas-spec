module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'xo',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'object-curly-spacing': ['error', 'always'],
		// Probably want to fix this later
		'no-warning-comments': 0,
	},
	ignorePatterns: [
		'public/*',
	],
	overrides: [
		{
			files: [
				'**/*.test.js',
				'**/*.test.ts',
			],
			env: {
				jest: true,
			},
		},
	],
};
