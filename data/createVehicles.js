const axios = require('axios');

// List of events to post
const vehicles =  [
  {
    "userId": 2,
    "name": "Reynolds",
    "type": "car",
    "location": "Australia",
    "make": "Toyota",
    "model": "Landcruiser 70 Series - VDJ78 (Troopcarrier)",
    "year": 2017,
    "image": "vehicle-75395a84-1707724670462.jpg",
    "profile": "The troopy is like a blank canvas of opportunity, a chance to express your creativity and reach that sweet spot of form and functionality. ",
  },
  {
    "userId": 2,
    "name": "MQ Triton",
    "type": "car",
    "location": "Australia",
    "make": "Mitsubishi",
    "model": "Triton MQ",
    "year": 2019,
    "image": "vehicle-67a4b6fc-1707724857430.jpg",
    "profile": "The Triton is like other diesel four-wheel drives, and so you need to be aware of the potential for a build-up of black gunk in the intake manifold and the Exhaust Gas Recirculation (EGR) valve.",
  },
  {
    "userId": 1,
    "name": "Brutus",
    "type": "car",
    "location": "Australia",
    "make": "BMW",
    "model": "130i E87",
    "year": 2009,
    "image": "vehicle-3ae0dd6d-1707725177917.jpg",
    "profile": "your neighbors won't think \"mmm.... that's an expensive car, he must be doing well\" they all think \"that's an expensive car he must be bonkers\"",
  },
  {
    "userId": 1,
    "name": "Manual Swapped E46",
    "type": "car",
    "location": "Australia",
    "make": "BMW",
    "model": "325i E46",
    "year": 2005,
    "image": "vehicle-52d2e5af-1707725334306.jpg",
    "profile": "We bought this car with a blown head gasket, rebuilt the engine then swapped the auto transmission out for a manual one from a 330i e46 which had a ZF320 5 speed in it. This car would have been amazing to keep but we had to move it on as the goal was to make a profitable flip.",
  }
]
  
// Server URL
const url = 'http://localhost:3000/api/vehicles';

// Async function to post each event
async function postVehicles() {
  for (const vehicle of vehicles) {
    try {
      const response = await axios.post(url, vehicle);
      console.log(`Successfully posted event: ${vehicle.name}`);
    } catch (error) {
      console.error(`Failed to post event: ${vehicle.name}. Error: ${error.message}`);
    }
  }
}

// Execute the function
postVehicles();
