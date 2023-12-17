//Create Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('./plugins/findOrCreate');

const UserAccountSchema = new Schema(
  {
    username: {
      type: String,
      index: true,
      unique: true,
    },
    accounts: [{ type: String, field: 'env', ref: 'Account_Config' }],
    startTime: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserAccountSchema.plugin(findOrCreate);
const UserAccount = mongoose.model('User_Account', UserAccountSchema);

module.exports = UserAccount;
