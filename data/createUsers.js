const axios = require('axios');

// List of events to post
const users =  [
    {
      "name": "Max Chai",
      "email": "max.chai@gmail.com",
      "password": "password",
      "image": "user-8525471a-1707724254653.jpg",
      "profile": "im nick's golden retriever :D",
    },
    {
      "name": "Nick Chai",
      "email": "nicholas.chai@outlook.com",
      "password": "password",
      "image": "user-5e6eca0b-1707724382277.jpg",
      "profile": "Nick is a proud owner of two remarkable and distinct vehicles: a Land Cruiser and a BMW 130i. The Land Cruiser, celebrated for its robust reliability and exceptional off-road capabilities, reflects Nick's adventurous spirit and his appreciation for endurance in challenging terrains. It suggests a love for exploration and a lifestyle that embraces the road less traveled. Meanwhile, the BMW 130i showcases a different aspect of Nick's personality, highlighting his passion for performance, sophistication, and the pure joy of driving. Known for its agility and sporty dynamics, the BMW 130i represents Nick's appreciation for fine automotive engineering and a penchant for exhilarating driving experiences.  Owning these two vehicles, Nick demonstrates a comprehensive automotive enthusiasm that values both utility and performance. This duality suggests a lifestyle that harmonizes practicality with the pursuit of excitement, showcasing a person who enjoys the best of both worlds: the thrill of adventure and the pleasure of engaging driving dynamics. Nick is depicted as versatile, pragmatic, and discerning in his choice of vehicles, valuing reliability and capability as much as speed and handling.  Nick's selection of vehicles indicates a profound understanding of what makes each car special: the Land Cruiser for moments that demand toughness and resilience, and the BMW 130i for when the road beckons for agility and speed. Likely possessing a deep appreciation for the history and heritage of his vehicles, Nick understands the unique value each brand and model adds to his driving experience, balancing functionality and fun in his automotive pursuits.",
    }
  ]
  
// Server URL
const url = 'http://localhost:3000/api/users';

// Async function to post each event
async function postUsers() {
  for (const user of users) {
    try {
      const response = await axios.post(url, user);
      console.log(`Successfully posted event: ${user.name}`);
    } catch (error) {
      console.error(`Failed to post event: ${user.name}. Error: ${error.message}`);
    }
  }
}

// Execute the function
postUsers();
