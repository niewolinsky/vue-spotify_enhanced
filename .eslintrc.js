// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:vue3-essential', 'prettier'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['vue'],
	rules: {
		// override/add rules settings here, such as:
		'vue/no-unused-vars': 'error',
		'vue/script-setup-uses-vars': 'off',
	},
}
