module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};