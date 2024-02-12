const axios = require('axios');

// List of events to post
const events = [
    {
      "vehicleId": 4,
      "title": "Acquisition of the E46",
      "detail": "Bought a BMW E46 with a blown head gasket. The project begins.",
      "type": "story",
      "date": "2021-01-10",
      "odometer": 170000,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "Engine Rebuild",
      "detail": "Began the meticulous process of rebuilding the engine. Every part inspected and restored to perfection.",
      "type": "repair",
      "date": "2021-03-15",
      "odometer": 170050,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "Engine Successfully Rebuilt",
      "detail": "The engine rebuild is complete. The E46 roars to life once more, better than ever.",
      "type": "story",
      "date": "2021-05-20",
      "odometer": 170100,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "Transmission Swap Preparation",
      "detail": "Sourced a ZF320 5-speed manual transmission from a 330i E46. Ready for the swap.",
      "type": "modification",
      "date": "2021-07-05",
      "odometer": 170150,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "Manual Transmission Swap",
      "detail": "Swapped the automatic transmission for the manual ZF320. A new era for the E46 begins.",
      "type": "modification",
      "date": "2021-08-25",
      "odometer": 170200,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "First Drive with Manual Transmission",
      "detail": "Took the E46 for its first drive post-transmission swap. The difference is night and day.",
      "type": "story",
      "date": "2021-09-10",
      "odometer": 170250,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "Fine-Tuning and Adjustments",
      "detail": "Made some fine-tuning adjustments to optimize the manual transmission setup. The E46 is performing beautifully.",
      "type": "maintenance",
      "date": "2021-10-15",
      "odometer": 170300,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "Last Drive",
      "detail": "Took the E46 out for one last drive. Reflecting on the journey and the joy this car brought.",
      "type": "story",
      "date": "2021-12-01",
      "odometer": 175000,
      "published": true
    },
    {
      "vehicleId": 4,
      "title": "Saying Goodbye",
      "detail": "With a heavy heart, we sold the E46. It was an amazing project and an unforgettable car.",
      "type": "story",
      "date": "2022-01-20",
      "odometer": 175050,
      "published": true
    }
  ]
  
// Server URL
const url = 'http://localhost:3000/api/events';

// Async function to post each event
async function postEvents() {
  for (const event of events) {
    try {
      const response = await axios.post(url, event);
      console.log(`Successfully posted event: ${event.title}`);
    } catch (error) {
      console.error(`Failed to post event: ${event.title}. Error: ${error.message}`);
    }
  }
}

// Execute the function
postEvents();
