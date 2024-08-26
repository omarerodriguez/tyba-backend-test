const jwt = require('jsonwebtoken');
const mongo = require('../adapters/database/model/index');
const tokenBlacklist = new Set();

//Repositories
const UserRepository = require('../adapters/database/repository/user-mongoose-repository');
const GooglePlacesRespository = require('../adapters/database/repository/google-place-repository');
const TransactionRepository = require('../adapters/database/repository/transaction-repository');

//UseCase
const UserUseCases = require('../applications/user-usecases');
const AuthUseCases = require('../applications/auth-usecases');
const RestaurantUseCases = require('../applications/restaurant-usecases');
const TransactionUseCases = require('../applications/transaccion-usecases');

//Handler
const UserHandler = require('../../src/adapters/http/user/user-handler');
const RestaurantHandler = require('../adapters/http/restaurant/restaurant-handler');
const TransactionHandler = require('../adapters/http/transaction/transaction-handler');

//Middleware
const TokenMiddleware = require('../adapters/http/middleware/authentication');

//Intances-Repositories
const userRepository = new UserRepository(mongo);
const googlePlacesRespository = new GooglePlacesRespository();
const transactionRepository = new TransactionRepository(mongo);

//Intances-UseCases
const authUseCases = new AuthUseCases(jwt, tokenBlacklist);
const userUseCases = new UserUseCases(
  userRepository,
  authUseCases,
  tokenBlacklist,
);
const restaurantUseCases = new RestaurantUseCases(googlePlacesRespository);
const transactionUseCases = new TransactionUseCases(
  googlePlacesRespository,
  transactionRepository,
);

//Intances-Handlers
const userHandler = new UserHandler(userUseCases);
const restaurantHandler = new RestaurantHandler(restaurantUseCases);
const transactionHandler = new TransactionHandler(transactionUseCases);

//Intances-Middleware
const tokenMiddleware = new TokenMiddleware(authUseCases, tokenBlacklist);

module.exports = {
  tokenMiddleware,
  userHandler,
  restaurantHandler,
  transactionHandler,
};
