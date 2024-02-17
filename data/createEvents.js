const axios = require('axios');

// List of events to post
const events = [
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "Acquisition of the New Adventure Rig",
    "detail": "Welcomed a rugged, ready-for-anything vehicle into our lives, setting the stage for countless beach camping adventures across the stunning landscapes of Western Australia.",
    "type": "story",
    "date": "2021-03-01",
    "odometer": 120000,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "First Modification: All-Terrain Tires",
    "detail": "Equipped our vehicle with all-terrain tires, enhancing its capability to traverse the sandy beaches and rugged outbacks with ease, marking our first step towards customizing our adventure rig.",
    "type": "modification",
    "date": "2021-04-15",
    "odometer": 120500,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "The Inaugural Beach Camp",
    "detail": "Embarked on our first beach camping trip, with the vehicle proving its mettle against the challenging terrains of Yanchep. It was an unforgettable initiation into the world of off-road camping.",
    "type": "story",
    "date": "2021-05-20",
    "odometer": 121000,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "Suspension Upgrade for Tougher Trails",
    "detail": "Upgraded the suspension system to better absorb the shocks and bumps of off-road driving. This modification allowed us to tackle even more challenging terrains with confidence.",
    "type": "upgrade",
    "date": "2021-07-05",
    "odometer": 121500,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "Overcoming a Breakdown in the Bush",
    "detail": "Faced our first major challenge when the vehicle broke down in the remote bushlands. The repair was a testament to resilience and teamwork, strengthening our bond with the rig.",
    "type": "repair",
    "date": "2021-08-10",
    "odometer": 122000,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "Custom Roof Rack Installation",
    "detail": "Added a custom roof rack, expanding our capacity for gear and supplies. This modification was crucial for our extended camping trips and adventures under the Western Australian stars.",
    "type": "modification",
    "date": "2021-09-25",
    "odometer": 122500,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "Exploring the Coral Coast",
    "detail": "The vehicle took us on a memorable journey along the Coral Coast, where rugged landscapes meet the turquoise sea. Each mile covered was a story of discovery and awe.",
    "type": "story",
    "date": "2021-11-15",
    "odometer": 130000,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "The Ultimate Beach Camp Setup",
    "detail": "Finalized our beach camp setup with a state-of-the-art awning and portable solar panels, marking the culmination of our vehicle's transformation into the ultimate beach camping companion.",
    "type": "upgrade",
    "date": "2022-01-10",
    "odometer": 130500,
    "published": true
  },
  {
    "vehicleId": 2,
    "userId": 2,
    "title": "Reflections on a Year of Adventures",
    "detail": "As we look back on a year filled with incredible journeys and the transformation of our vehicle into a beacon of adventure, we're filled with gratitude for the memories made and the miles traveled.",
    "type": "story",
    "date": "2022-03-01",
    "odometer": 135000,
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
