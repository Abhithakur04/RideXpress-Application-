const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      // Access the first result (most relevant)
      const location = response.data[0];
      return {
        lat: location.lat,
        lng: location.lon,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (err) {
    throw new Error(`Error fetching data from Nominatim: ${err.message}`);
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const org = await module.exports.getAddressCoordinate(origin);
  const dest = await module.exports.getAddressCoordinate(destination);

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${org.lng},${org.lat}&end=${dest.lng},${dest.lat}`;
  try {
    const response = await axios.get(url);
    
    if (response.data.features && response.data.features.length > 0) {
        const route = response.data.features[0].properties;
      const duration = route.summary.distance; // Duration in seconds
      const distance =  route.summary.duration; // Distance in meters

      return {
        duration: duration, // Duration in seconds
        distance: distance, // Distance in meters
      };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    throw err;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    input
  )}&format=json&addressdetails=1&limit=5`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      return response.data; // Return the suggestions directly from the response
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    throw err;
  }
};

//this function returns the drivers whose loaction matches to pickup location and we provide them live location using updateLocation function in capatin home

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};






