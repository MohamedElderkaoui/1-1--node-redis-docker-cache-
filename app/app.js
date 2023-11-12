const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Create a Redis client
const client = redis.createClient();

// Simple middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Endpoint to fetch data with caching
app.get('/data', (req, res) => {
  // Check if data is cached in Redis
  client.get('cachedData', (err, cachedData) => {
    if (err) throw err;

    if (cachedData) {
      // If cached data exists, return it
      console.log('Data retrieved from cache');
      res.json(JSON.parse(cachedData));
    } else {
      // If not cached, simulate fetching data from a database
      const data = {
        message: 'Data fetched from the server',
        timestamp: new Date().toISOString(),
      };

      // Store the data in Redis with a 10-second expiration
      client.setex('cachedData', 10, JSON.stringify(data));

      console.log('Data fetched from the server and stored in cache');
      res.json(data);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
