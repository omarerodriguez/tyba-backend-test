const {
  transactionHandler,
  tokenMiddleware,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/restaurant/transactions',
    method: 'POST',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: transactionHandler.createTransaction,
  },

  {
    url: '/restaurant/transactions',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: transactionHandler.findAllTransactions,
  },
];
module.exports = routes;
