import { Router } from 'express';
import {
  UserController,
  AuthController,
  AccountConfigController,
  UserAccountController,
} from './controllers';
import { UserService, AuthService, AccountConfigService } from './services';
import { loginValidation, refreshTokenValidation } from './middlewares';
import { auth } from '../../middlewares';
import User from '../../models/user';
import AccountConfig from '../../models/account-config.model';

const userService = new UserService({ UserModel: User });
const authService = new AuthService({ UserModel: User });
const accountConfigService = new AccountConfigService({ AccountConfigModel: AccountConfig });

const userController = new UserController({
  userService,
});
const authController = new AuthController({
  authService,
});

const accountConfigController = new AccountConfigController({
  accountConfigService,
});
const userAccountController = new UserAccountController();
const router = Router();

router.post('/login', loginValidation, authController.login);
router.post('/logout', auth, authController.logout);
router.post('/refresh-token', refreshTokenValidation, authController.refreshToken);
router.get('/me', auth, authController.getProfile);
router.get('/users/', [auth], userController.index);
router.post('/users', userController.create);
// router.get('/users/:id', [auth], userController.show);
// router.put('/users/:id', [auth], userController.update);
// router.delete('/users/:id', [auth], userController.delete);

router.get('/users/:username', userAccountController.show);
router.get('/config', accountConfigController.getConfig);
// router.get('/config/:account', accountConfigController.show);
router.get('/config/:username/all', accountConfigController.showAllConfigOfUser);

export default router;
