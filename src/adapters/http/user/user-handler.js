module.exports = class UserHandler {
  constructor(userUseCase, blacklist) {
    this.userUseCase = userUseCase;
    this.blacklist = blacklist;
  }

  RegisterUser = async (req, res) => {
    try {
      const [user, token, status, error] = await this.userUseCase.RegisterUser(
        req.body,
      );
      if (error)
        return res.status(status).send({
          message: 'Fail',
          errors: error,
        });
      return res.status(status).send({
        data: user,
        token,
        message: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error.message,
      });
    }
  };

  login = async (req, res) => {
    try {
      const [user, token, status, error] = await this.userUseCase.login(
        req.body,
      );
      if (error)
        return res.status(status).send({
          message: 'Fail',
          errors: error,
        });
      return res.status(status).send({
        data: user,
        token,
        message: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error.message,
      });
    }
  };

  logout = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).send({
          message: 'Token not provided',
        });
      }
      const [, status, error] = await this.userUseCase.logout(token);
      if (error)
        return res.status(status).send({
          message: 'Fail',
          errors: error.message,
        });
      return res.status(status).send({
        message: 'User logged out successfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was an internal server error',
        errors: error.message,
      });
    }
  };

  findUserById = async (req, res) => {
    try {
      if (!res.locals?.decodedToken)
        return res.status(400).send({
          message: 'fail',
          errors: 'TokenBody is required',
        });
      const { decodedToken } = res.locals ?? null;
      const userId = decodedToken.userId;
      const [user, status, error] = await this.userUseCase.findUserById(userId);
      if (error)
        return res.status(status).send({
          message: 'Fail',
          errors: error,
        });
      return res.status(status).send({
        data: user,
        message: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error.message,
      });
    }
  };

  findCustomerByEmail = async (req, res) => {
    try {
      const { email } = req.query;
      const [user, status, error] = await this.userUseCase.findUserByEmail(
        email,
      );
      if (error)
        return res.status(status).send({
          message: 'Fail',
          errors: error,
        });
      return res.status(status).send({
        data: user,
        message: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error.message,
      });
    }
  };
};
