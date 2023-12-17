import { UserAccountService } from './../services';

export class UserAccountController {
  constructor() {
    this.userAccountService = new UserAccountService();
  }

  /**
   * Get all users
   */
  index = async (req, res, next) => {
    try {
      const userAccounts = await this.userAccountService.findAll(req.query);
      return res.status(200).json(userAccounts);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Create new userAccount
   */
  create = async (req, res, next) => {
    try {
      const userAccount = await this.userAccountService.createUser({
        name: req.body.name,
        password: req.body.password,
      });

      return res.status(200).json();
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Get userAccount by id
   */
  show = async (req, res, next) => {
    try {
      const userAccount = await this.userAccountService.findOne(req.params.username.toUpperCase());
      return res.status(200).send(userAccount);
    } catch (err) {
      return next(err);
    }
  };

  /**
   * Update userAccount
   */
  update = async (req, res, next) => {
    try {
      await this.userAccountService.updateUser(
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
   * Remove userAccount
   */
  delete = async (req, res, next) => {
    try {
      await this.userAccountService.removeUser(req.params.id);

      return res.status(200).json({});
    } catch (err) {
      return next(err);
    }
  };
}
