export class AccountConfigService {
  constructor({ AccountConfigModel }) {
    this.AccountConfigModel = AccountConfigModel;
  }

  findAll = (accounts) => {
    return this.AccountConfigModel.find({ env: { $in: accounts } });
  };

  findById = (userId) => {
    return this.AccountConfigModel.find(userId);
  };

  findOne = (account) => {
    return this.AccountConfigModel.findOne({ env: account });
  };

  createAccountConfig = (accountConfig) => {
    return new this.AccountConfigModel(accountConfig).save();
  };

  updateAccountConfig = (account, data, options) => {
    return this.AccountConfigModel.findOneAndUpdate({ env: account }, data, options);
  };

  removeAccountConfig = (account) => {
    return this.AccountConfigModel.findOneAndRemove({ env: account });
  };
}
