const {
  validateCityInputSearchParams,
  validateInputLocationSearchParams,
  validateRestaurantId,
} = require('../../../utils/functions/validateInputs');
module.exports = class RestaurantHandler {
  constructor(restaurantUseCases) {
    this.restaurantUseCases = restaurantUseCases;
  }

  searchRestaurantByCity = async (req, res) => {
    try {
      const { city } = req.query;
      if (!city) {
        return res.status(400).send({
          message: 'City is required',
        });
      }
      validateCityInputSearchParams(city);
      const [restaurants, status, error] =
        await this.restaurantUseCases.findRestaurants({ city });
      if (error)
        return res.status(status).send({
          message: 'Fail',
          error,
        });

      return res.status(status).send({
        data: restaurants,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };

  searchNearbyRestaurants = async (req, res) => {
    try {
      const { location, radius } = req.query;

      if (!location) {
        return res.status(400).send({
          message: 'Location is required',
        });
      }
      validateInputLocationSearchParams(location, radius);
      const [restaurants, status, error] =
        await this.restaurantUseCases.findRestaurants({ location, radius });
      if (error) {
        return res.status(status).send({
          message: 'Fail',
          error,
        });
      }
      return res.status(status).send({
        data: restaurants,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error.message,
      });
    }
  };

  searchRestaurantById = async (req, res) => {
    try {
      const { restaurantId } = req.query;
      if (!restaurantId) {
        return res.status(400).send({
          message: 'Restaurant Id is required',
        });
      }
      validateRestaurantId(restaurantId);
      const [restaurants, status, error] =
        await this.restaurantUseCases.findRestaurants({ restaurantId });
      if (error) {
        return res.status(status).send({
          message: 'Fail',
          error,
        });
      }

      return res.status(status).send({
        data: restaurants,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };
};
