
# API Documentation - Readme

## Overview
This API provides various endpoints for managing users and captains, as well as retrieving map and ride-related data. The API uses JWT tokens for authentication and supports a variety of operations such as user registration, login, profile retrieval, and creating rides. It also integrates with OpenStreetMap and OpenRouteService APIs to provide location-related services like coordinates, distance, and time estimation.

---

## Authentication

- **JWT Authentication** is required for most endpoints (e.g., login, profile, and ride-related operations).
- To authenticate, include the JWT token in the Authorization header of your requests:



---

## Endpoints

### `/users/register`
- **Description**: Registers a new user by creating a user account.
- **HTTP Method**: `POST`
- **Request Body**: JSON format containing:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string (optional)"
  },
  "email": "string",
  "password": "string"
}
Response:
json
Copy
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "string"
  },
  "token": "string"
}
/users/login
Description: Authenticates a user and returns a JWT token.

HTTP Method: POST

Request Body: JSON format containing:



{
  "email": "string",
  "password": "string"
}
Response:


{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "string"
  },
  "token": "string"
}
/users/profile
Description: Retrieves the profile information of the authenticated user.
HTTP Method: GET
Authentication: Requires a valid JWT token in the Authorization header.
Response:

{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
/users/logout
Description: Logs out the current user and blacklists the token.
HTTP Method: GET
Authentication: Requires a valid JWT token in the Authorization header or cookie.
Response:

{
  "message": "Logout successfully."
}
/captains/register
Description: Registers a new captain with vehicle details.

HTTP Method: POST

Request Body: JSON format containing:


{
  "fullname": {
    "firstname": "string",
    "lastname": "string (optional)"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": number,
    "vehicleType": "string"
  }
}
Response:


{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    }
  },
  "token": "string"
}
/captains/login
Description: Authenticates a captain and returns a JWT token.

HTTP Method: POST

Request Body: JSON format containing:


{
  "email": "string",
  "password": "string"
}
Response:

json
Copy
{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    }
  },
  "token": "string"
}
/captains/profile
Description: Retrieves the profile information of the authenticated captain.
HTTP Method: GET
Authentication: Requires a valid JWT token in the Authorization header.
Response:

{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    }
  }
}
/captains/logout
Description: Logs out the current captain and blacklists the token.
HTTP Method: GET
Authentication: Requires a valid JWT token in the Authorization header or cookie.
Response:

{
  "message": "Logout successfully."
}
/maps/get-coordinates
Description: Retrieves the coordinates (latitude and longitude) for a given address.

HTTP Method: GET

Request Parameters:

address: The address for which to retrieve coordinates (required).
Example Request:

GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
Example Response:

json
Copy
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
/maps/get-distance-time
Description: Retrieves the distance and estimated travel time between two locations.

HTTP Method: GET

Request Parameters:

origin: The starting address or location (required).
destination: The destination address or location (required).
Example Request:


GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
Example Response:


{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
/maps/get-suggestions
Description: Retrieves autocomplete suggestions for a given input string.

HTTP Method: GET

Request Parameters:

input: The input string for which to retrieve suggestions (required).
Example Request:


GET /maps/get-suggestions?input=1600+Amphitheatre
Example Response:

json
Copy
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
/rides/create
Description: Creates a new ride.

HTTP Method: POST

Authentication: Requires a valid JWT token in the Authorization header.

Request Body: JSON format containing:


{
  "pickup": "string",
  "destination": "string",
  "vehicleType": "string"
}
Response:

{
  "ride": {
    "user": "string",
    "pickup": "string",
    "destination": "string",
    "fare": "number",
    "status": "string",
    "duration": "number",
    "distance": "number",
    "otp": "string"
  }
}
/rides/get-fare
Description: Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

HTTP Method: GET

Authentication: Requires a valid JWT token in the Authorization header.

Request Parameters:

pickup: The pickup address (required).
destination: The destination address (required).
Example Request:


GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
Example Response:


{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
External APIs Used
OpenStreetMap: For retrieving coordinates of an address.

Endpoint: https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}
OpenRouteService: For calculating distance and estimated travel time.

Endpoint: https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${org.lng},${org.lat}&end=${dest.lng},${dest.lat}
Error Handling
Each endpoint may return standard HTTP error codes, such as:

400 Bad Request: If a required parameter is missing or invalid.
404 Not Found: If a resource could not be found.
500 Internal Server Error: If there is an error processing the request.
Error responses will include a message indicating the issue, such as:


{
  "message": "Error message"
}
