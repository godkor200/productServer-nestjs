import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', //  ts-jest를 사용한다고 알려준다
  testEnvironment: 'node', //테스트 환경 'node' 환경을 사용한다 알려줌
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: './src',
  moduleNameMapper: {
    '^@users/(.*)$': '<rootDir>/users/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@schema/(.*)$': '<rootDir>/schema/$1',
    '^@db/(.*)$': '<rootDir>/db/$1',
  },
  //js 파일은 dist에서도 감지가 될 수 있으니 폴더를 조정해서 test이 있는 위치로 잡아준다.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/dummydata',
  ],
};

export default config;
