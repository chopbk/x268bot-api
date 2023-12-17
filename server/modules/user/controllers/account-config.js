import { UserAccountService } from '../services';
import { ResSuccess } from '../../../helpers/Response';

const userAccountService = new UserAccountService();
export class AccountConfigController {
  constructor({ accountConfigService }) {
    this.accountConfigService = accountConfigService;
    this.userAccountService = userAccountService;
  }

  /**
   * Get all users
   */
  index = async (req, res, next) => {
    try {
      const accountConfigs = await this.accountConfigService.findAll(req.query);
      return res.status(200).json(accountConfigs);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Create new accountConfig
   */
  create = async (req, res, next) => {
    try {
      const accountConfig = await this.accountConfigService.createUser({
        name: req.body.name,
        password: req.body.password,
      });

      return res.status(200).json(accountConfig);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get accountConfig by id
   */
  getConfig = async (req, res, next) => {
    try {
      console.log(req.query);
      let { username, account, accounts } = req.query;
      if (account) {
        account = account.toUpperCase();
        const accountConfig = await this.accountConfigService.findOne(account);
        console.log(accountConfig);
        return ResSuccess(res, accountConfig.toPayload(), 200);
      }
      if (username) {
        username = username.toUpperCase();
        const accountOfUser = await this.userAccountService.findOne(username);
        if (!accountOfUser) return res.status(200).send(`no account of username ${username}`);
        const accountConfig = await this.accountConfigService.findAll(accountOfUser.accounts);
        let result = accountConfig.map((config) => config.toPayload());
        return ResSuccess(res, result, 200);
        return res.status(200).send(result);
      }
      if (accounts) {
        let accountEnvs = accounts.toUpperCase().split(',');
        const accountConfig = await this.accountConfigService.findAll(accountEnvs);
        let result = accountConfig.map((config) => config.toPayload());
        return ResSuccess(res, result, 200);
      }
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get accountConfig by id
   */
  show = async (req, res, next) => {
    try {
      const accountConfig = await this.accountConfigService.findOne(
        req.params.account.toUpperCase()
      );

      return res.status(200).send(accountConfig.toPayload());
    } catch (err) {
      return next(err);
    }
  };

  showAllConfigOfUser = async (req, res, next) => {
    try {
      let username = req.params.username.toUpperCase();

      const accountOfUser = await this.userAccountService.findOne(username);
      if (!accountOfUser) return res.status(200).send(`no account of username ${username}`);

      const accountConfig = await this.accountConfigService.findAll(accountOfUser.accounts);
      let result = accountConfig.map((config) => config.toPayload());
      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  };

  showConfigOfAccounts = async (req, res, next) => {
    try {
      let accounts = req.params.accounts.toUpperCase();

      const accountOfUser = await this.userAccountService.findOne(username);
      if (!accountOfUser) return res.status(200).send(`no account of username ${username}`);

      const accountConfig = await this.accountConfigService.findAll(accountOfUser.accounts);
      let result = accountConfig.map((config) => config.toPayload());
      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Update accountConfig
   */
  update = async (req, res, next) => {
    try {
      await this.accountConfigService.updateUser(
        req.params.id,
        Object.assign(
          req.body.name ? { name: req.body.name } : {},
          req.body.password ? { password: req.body.password } : {}
        ),
        { new: true }
      );

      return res.status(204).json({});
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Remove accountConfig
   */
  delete = async (req, res, next) => {
    try {
      await this.accountConfigService.removeUser(req.params.id);

      return res.status(200).json({});
    } catch (err) {
      return next(err);
    }
  };
}
