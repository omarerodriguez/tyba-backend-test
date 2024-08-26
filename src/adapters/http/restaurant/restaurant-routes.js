const {
  restaurantHandler,
  tokenMiddleware,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/restaurant/by-city',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: restaurantHandler.searchRestaurantByCity,
  },
  {
    url: '/restaurant/by-location',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: restaurantHandler.searchNearbyRestaurants,
  },
  {
    url: '/restaurant/by-id',
    method: 'GET',
    middlewares: [tokenMiddleware.verifyUserToken],
    handler: restaurantHandler.searchRestaurantById,
  },
];
module.exports = routes;
