import { MockModel } from '@db/test/mock.model';
import { User } from '@schema/user.schema';
import { userStub } from '@users/test/stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}
