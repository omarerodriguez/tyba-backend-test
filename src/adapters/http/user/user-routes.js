const {
  userHandler,
  tokenMiddleware,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/profile',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: userHandler.findUserById,
  },
  {
    url: '/signup',
    method: 'POST',
    handler: userHandler.RegisterUser,
  },
  {
    url: '/login',
    method: 'POST',
    handler: userHandler.login,
  },
  {
    url: '/logout',
    method: 'POST',
    handler: userHandler.logout,
  },
];
module.exports = routes;
