import { User } from '../models/user.model';

export function GetUser(userId: string) {
  return new Promise(async (resolve) => {
    resolve(await User.findById(userId));
  });
}

export function UpdateUser(userId: string, updateModel: any) {
  User.findByIdAndUpdate(userId, updateModel, () => {});
}
