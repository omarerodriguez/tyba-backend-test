module.exports = class RestaurantUseCases {
  constructor(googlePlacesRespository) {
    this.googlePlacesRespository = googlePlacesRespository;
  }

  findRestaurants = async (params) => {
    const { restaurantId, city, location, radius } = params;

    if (city) {
      const [restaurants, error] =
        await this.googlePlacesRespository.searchRestaurantsByCity(city);
      if (error)
        return [
          null,
          404,
          'Restaurants not found in this city or type error city',
        ];
      return [restaurants, 200, error];
    }

    if (location) {
      const [restaurants, error] =
        await this.googlePlacesRespository.searchNearbyRestaurants(
          location,
          radius,
        );
      if (error) return [null, 404, error];
      return [restaurants, 200, null];
    }

    if (restaurantId) {
      const [restaurants, error] =
        await this.googlePlacesRespository.searchRestaurantById(restaurantId);
      if (error) return [null, 404, 'Restaurants not found'];
      return [restaurants, 200, error];
    }
    return [null, 'City and/or location is required'];
  };
};
