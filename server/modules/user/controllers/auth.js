import { authService } from '../services';
import { authSerializer, userSerializer } from '../serializer';

class AuthController {
  login = async (req, res, next) => {
    try {
      const result = await authService.authenticate(req.body);
      return res.status(200).json(authSerializer.serialize(result));
    } catch (e) {
      next(e);
    }
  };

  getProfile = async (req, res, next) => {
    try {
      const user = await authService.getUser(req.user.id);
      return res.status(200).json(userSerializer.serialize(user));
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      await authService.logout(req.user.id);
      return res.status(200).json({});
    } catch (e) {
      next(e);
    }
  };

  refrehToken = async (req, res, next) => {
    try {
      const authUser = await authService.refrehToken(req.body.refresh_token);

      return res.status(200).json(authSerializer.serialize(authUser));
    } catch (e) {
      return next(e);
    }
  };
}

export default AuthController;
