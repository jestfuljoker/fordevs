module.exports = {
	roots: ['<rootDir>/src'],
	coverageProvider: 'v8',
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/*.d.ts'],
	coverageDirectory: 'coverage',
	transform: {
		'^.+\\.ts?$': '@swc/jest',
	},
};
