module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!**/*.d.ts',
		'!<rootDir>/src/main/**',
	],
	coverageDirectory: 'coverage',
	transform: {
		'^.+\\.ts?$': '@swc/jest',
	},
	preset: '@shelf/jest-mongodb',
	moduleNameMapper: {
		'@data/(.*)': '<rootDir>/src/data/$1',
		'@domain/(.*)': '<rootDir>/src/domain/$1',
		'@infra/(.*)': '<rootDir>/src/infra/$1',
		'@main/(.*)': '<rootDir>/src/main/$1',
		'@presentation/(.*)': '<rootDir>/src/presentation/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
	},
};
