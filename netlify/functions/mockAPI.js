// netlify/functions/getCities.js

export async function handler(event, context) {
  try {
    if (event.httpMethod === "GET") {
      // Define the cities data directly in the function
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
          // ... (other city objects)
        ],
      };

      return {
        statusCode: 200,
        body: JSON.stringify(citiesData),
      };
    } else if (event.httpMethod === "POST") {
      // Access the request body for POST requests
      const requestBody = JSON.parse(event.body);

      // Do something with the POST data (replace this with your actual logic)
      const responseData = {
        message: "Data received successfully",
        receivedData: requestBody,
      };

      return {
        statusCode: 200,
        body: JSON.stringify(responseData),
      };
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
