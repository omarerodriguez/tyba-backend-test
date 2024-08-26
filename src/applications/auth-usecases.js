const bcrypt = require('bcryptjs');

module.exports = class AuthUseCases {
  constructor(jwt, tokenBlacklist) {
    this.jwt = jwt;
    this.tokenBlacklist = tokenBlacklist;
  }

  blacklistToken = async (token) => {
    try {
      // Agregar el token a la lista negra
      this.tokenBlacklist.add(token);
      return [null, null];
    } catch (error) {
      return [null, error.message];
    }
  };

  generateToken = async (userId) => {
    try {
      if (!userId) return [null, 'empty data not allow'];
      const payload = { userId };
      const token = await this.jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '60m',
      });
      return [token, null];
    } catch (error) {
      return [null, error.message];
    }
  };

  verifyToken = (token) => {
    try {
      if (!token) return [null, 401, 'Token not provided'];

      if (this.tokenBlacklist.has(token)) {
        return [null, 401, 'Token is invalidated'];
      }

      const decodedToken = this.jwt.verify(token, process.env.JWT_SECRET_KEY);

      return [decodedToken, 200, null];
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return [null, 401, 'Token has expired'];
      }
      return [null, 403, 'Invalid token.'];
    }
  };

  generatePassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return [salt, hashedPassword];
    } catch (error) {
      return [null, error.message];
    }
  };

  verifyPassword = async (password, hashedPassword, salt) => {
    try {
      const hash = await bcrypt.hash(password, salt);
      return hash === hashedPassword;
    } catch (error) {
      return false;
    }
  };
};
