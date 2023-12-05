// netlify/functions/mockAPI.js

const citiesData = {
  cities: [
    {
      cityName: "Delhi",
      emoji: "🇮🇳",
      date: "2023-12-04T16:35:39.039Z",
      notes: "khvhvhv",
      position: {
        lat: "28.574838168396173",
        lng: "77.22290039062501",
      },
      id: 1,
    },
    {
      cityName: "Gunnaur",
      emoji: "🇮🇳",
      date: "2023-12-04T16:36:11.316Z",
      notes: "",
      position: {
        lat: "28.227552912471282",
        lng: "78.45336914062501",
      },
      id: 2,
    },
    {
      cityName: "Lakhipur",
      emoji: "🇮🇳",
      date: "2023-12-04T16:36:45.862Z",
      notes: "",
      position: {
        lat: "26.153574769094213",
        lng: "90.32481667968749",
      },
      id: 3,
    },
    {
      cityName: "Katea",
      emoji: "🇮🇳",
      date: "2023-12-04T16:37:03.126Z",
      notes: "",
      position: {
        lat: "26.609579449314456",
        lng: "84.13100001462527",
      },
      id: 4,
    },
  ],
};

export async function handler(event, context) {
  try {
    if (event.httpMethod === "GET") {
      // Handle GET request to retrieve all cities
      return {
        statusCode: 200,
        body: JSON.stringify(citiesData.cities),
      };
    } else if (event.httpMethod === "POST") {
      // Handle POST request to create a new city
      const newCity = JSON.parse(event.body);
      newCity.id = citiesData.cities.length + 1; // Assign a new ID (replace with your logic)
      citiesData.cities.push(newCity);

      return {
        statusCode: 201, // Created
        body: JSON.stringify(newCity),
      };
    } else if (event.httpMethod === "DELETE") {
      // Handle DELETE request to delete a city
      const idToDelete = event.path.split("/").pop(); // Extract ID from the URL
      const indexToDelete = citiesData.cities.findIndex(
        (city) => city.id === parseInt(idToDelete, 10)
      );

      if (indexToDelete !== -1) {
        const deletedCity = citiesData.cities.splice(indexToDelete, 1)[0];
        return {
          statusCode: 200,
          body: JSON.stringify(deletedCity),
        };
      } else {
        return {
          statusCode: 404, // Not Found
          body: JSON.stringify({ error: "City not found" }),
        };
      }
    } else {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }
  } catch (error) {
    console.error("Error handling request:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}
