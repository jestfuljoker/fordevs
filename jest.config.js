module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/*.d.ts'],
	coverageDirectory: 'coverage',
	transform: {
		'^.+\\.ts?$': '@swc/jest',
	},
};
