import UserAccount from '../../../models/user-account.model';
export class UserAccountService {
  constructor() {
    this.UserAccountModel = UserAccount;
  }

  findAll = () => {
    return this.UserAccountModel.find();
  };

  findById = (userId) => {
    return this.UserAccountModel.find(userId);
  };
  findOne = (username) => {
    return this.UserAccountModel.findOne({ username: username });
  };
  createUserAccount = (userAccount) => {
    return new this.UserAccountModel(userAccount).save();
  };

  updateUserAccount = (username, data, options) => {
    return this.UserAccountModel.findOneAndUpdate({ username: username }, data, options);
  };

  removeUserAccount = (username) => {
    return this.UserAccountModel.findOneAndRemove({ username: username });
  };
}
