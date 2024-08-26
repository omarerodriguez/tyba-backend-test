const axios = require('axios');
module.exports = class GooglePlacesRespository {
  constructor() {}

  async searchRestaurantsByCity(city) {
    try {
      const baseUrl =
        'https://maps.googleapis.com/maps/api/place/textsearch/json';
      const query = `restaurant in ${city}`;
      const response = await axios.get(baseUrl, {
        params: {
          query,
          key: process.env.GOOGLE_API_KEY,
        },
      });

      const filteredRestaurants = response.data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
      }));
      return [filteredRestaurants, null];
    } catch (error) {
      return [null, error.message];
    }
  }

  async searchNearbyRestaurants(location, radius = 1500) {
    try {
      const baseUrl =
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
      const response = await axios.get(baseUrl, {
        params: {
          location,
          radius,
          type: 'restaurant',
          key: process.env.GOOGLE_API_KEY,
        },
      });

      const filteredRestaurants = response.data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
      }));

      return [filteredRestaurants, null];
    } catch (error) {
      return [null, error.message];
    }
  }

  async searchRestaurantById(restaurantId) {
    try {
      const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
      const response = await axios.get(baseUrl, {
        params: {
          place_id: restaurantId,
          key: process.env.GOOGLE_API_KEY,
        },
      });

      /**Extract restaurant details */
      const restaurantDetails = {
        id: response.data.result.place_id,
        name: response.data.result.name,
        address: response.data.result.formatted_address,
        phone: response.data.result.formatted_phone_number,
        rating: response.data.result.rating,
      };

      return [restaurantDetails, null];
    } catch (error) {
      return [null, error.message];
    }
  }
};
