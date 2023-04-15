import { IUser, User } from '../models/user.model';

export function GetUser(userId: string): Promise<IUser | null> {
  return new Promise(async (resolve) => {
    resolve(await User.findById(userId));
  });
}

export function UpdateUser(userId: string, updateModel: any) {
  User.findByIdAndUpdate(userId, updateModel, (err: unknown) => {
    if (err) {
      console.error('Cannnot update user: ' + err);
    } else {
      console.log('success updating user: ' + updateModel);
    }
  });
}
