module.exports = {
    extends: [
    	'airbnb-base',
    	'plugin:jest/recommended'
    ],
    plugins: [
	    'import',
	    'jest'
    ],
	env: {
	    node: true,
	    'jest/globals': true,
  },

	rules: {
		'arrow-parens':'off',
		'comma-dangle': 'off',
		'constructor-super': 'warn',
		'func-names': ['error', 'never'],
		'max-len': 'off',
		'no-const-assign': 'warn',
		'no-this-before-super': 'warn',
		'no-undef': 'warn',
		'no-unreachable': 'warn',
		'no-unused-vars': 'warn',
		'object-curly-spacing': ['error', 'always'],
		'require-jsdoc': 'off',
		'semi': ['error', 'always', {'omitLastInOneLineBlock': true}],
		'valid-typeof': 'warn'
    }


};