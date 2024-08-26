const {
  restaurantHandler,
  tokenMiddleware,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/restaurant',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: restaurantHandler.searchRestaurantByCity,
  },
  {
    url: '/restaurant/location',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: restaurantHandler.searchNearbyRestaurants,
  },
  {
    url: '/restaurant/id',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: restaurantHandler.searchRestaurantById,
  },
];
module.exports = routes;
