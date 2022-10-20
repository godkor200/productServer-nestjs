import { User } from '@schema/user.schema';

export const userStub = (): Partial<User> => {
  return {
    userName: '유병국',
    userId: 'godkor200',
    userPwd: '1111',
    userClass: 'general manager',
    userStatus: true,
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjYxNjE0MDcsImV4cCI6MTY2NjI0NzgwN30.stJK1aLS-do3lvxfaH5zwtieUJAcwOjLOkLlTO-bOuQ',
  };
};
