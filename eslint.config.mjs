// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	stylistic.configs['recommended-flat'],
	{
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@stylistic/semi': ['warn', 'always'],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/no-tabs': ['warn', { allowIndentationTabs: true }],
			'@stylistic/member-delimiter-style': ['warn', {
				multiline: {
					delimiter: 'comma',
					requireLast: true,
				},
				singleline: {
					delimiter: 'comma',
					requireLast: false,
				},
				multilineDetection: 'brackets',
			}],
		},
	},
);
