const validateCityInputSearchParams = (city) => {
  /**Check if the city and country are not empty */
  if (!city) {
    return [false, 'City and country are required'];
  }
  /**Check that the city name does not contain numbers */
  const cityHasNumber = /\d/.test(city);
  if (cityHasNumber) {
    return [false, 'City name should not contain numbers'];
  }

  return [true, null];
};

const validateInputLocationSearchParams = (location, radius) => {
  /**Check if the location is in the proper format */
  const locationPattern = /^-?\d+\.\d+,-?\d+\.\d+$/; // Format: "lat,lng"
  if (!locationPattern.test(location)) {
    return [false, 'Location should be in the format "latitude,longitude"'];
  }

  /**Verify that the radius is a valid number */
  const radiusNumber = parseInt(radius, 10);
  if (isNaN(radiusNumber) || radiusNumber <= 0) {
    return [false, 'Radius must be a positive number'];
  }

  return [true, null];
};

const validateRestaurantId = (restaurantId) => {
  /**Check if the restaurantId is not empty */
  if (!restaurantId) {
    return [false, 'Restaurant ID is required'];
  }
  /**Check that the restaurantId has the correct format (e.g., alphanumeric) */
  const idPattern = /^[a-zA-Z0-9_-]{27}$/; // Example pattern for Google Place IDs
  if (!idPattern.test(restaurantId)) {
    return [false, 'Invalid restaurant ID format'];
  }
  return [true, null];
};

module.exports = {
  validateInputLocationSearchParams,
  validateCityInputSearchParams,
  validateRestaurantId,
};
