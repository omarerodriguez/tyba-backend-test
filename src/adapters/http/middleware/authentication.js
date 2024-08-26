const extractTokenToHeader = require('../../../utils/functions/extractToken');
module.exports = class TokenMiddleware {
  constructor(authUseCases, tokenBlacklist) {
    this.authUseCases = authUseCases;
    this.token = null;
    this.tokenBlacklist = tokenBlacklist;
  }

  verifyUserToken = (req, res, next) => {
    const errSetToken = this.setToken(req, res);
    if (errSetToken) return errSetToken;

    const extractedToken = extractTokenToHeader(this.token);
    if (this.tokenBlacklist.has(extractedToken)) {
      return res.status(401).send({ message: 'Token is invalidated' });
    }

    const [decodedToken, status, errToken] = this.authUseCases.verifyToken(
      this.token,
    );
    res.locals.decodedToken = decodedToken;
    if (errToken) {
      return res.status(status).send({
        message: 'fail',
        errors: errToken,
      });
    }
    next();
  };

  setToken = (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send({
        message: 'fail',
        errors: 'Metodo de autenticacion invalido',
      });
      return res;
    }
    this.token = extractTokenToHeader(token);
  };
};
