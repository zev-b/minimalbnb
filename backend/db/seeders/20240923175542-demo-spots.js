'use strict'; 

const { Spot } = require('../models'); 

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object 
}

const seedData = [
     {
        ownerId: 4,
        address: "123 Batcave Den",
        city: "Gotham",
        state: "New York",
        country: "USA", 
        lat: 32.7341,
        lng: -50.4194,
        name: " The Bat Bench",
        description: "I am Vengeance. Sincerely, The Bat. P.S. If you are reading this, watch out for the Court of Owls. If you see them, there is a bat-a-rang under the tree nearby- Do not use it, its for me. Good Luck.",
        price: 13.50,
      },
      {
        ownerId: 1,
        address: "456 Seven Street",
        city: "Toelle",
        state: "Washington", 
        country: "USA", 
        lat: 25.4132, 
        lng: -80.1817, 
        name: "Wing Chair", 
        description: "Its got wings with arm-rests. Your winter-time Cryo-meditation spot. Your summer-time oasis.",
        price: 5.30,
      },
      {
        ownerId: 1,
        address: "789 Baseball Field Lane",
        city: "Boston",
        state: "Massachusetts", 
        country: "USA", 
        lat: 42.361145, 
        lng: -71.057083, 
        name: "The Bleachers", 
        description: "When your coach told you to be on time for practice at 5:30am. This is your option, sleep at the field. When you lose a game and you can't bare going home, sleep at the field. When you are bored, sleep at the field.", 
        price: 35.00,
      },
      {
        ownerId: 2,
        address: "22 Forest Floor",
        city: "Amazon",
        state: "Forest", 
        country: "Brazil", 
        lat: 3.4653, 
        lng: 62.2159, 
        name: "The Haunted Bench", 
        description: "This bench will give you nightmares! Haunted by the ghost of the tree its made out of. Some say the ghost can be seen in the distance. Legend has it, the tree was sleeping when it was fell, so it did not have a chance to give out a last cry. The ghost's attempt to get that cry out has made way for a moss-growth on the bench, so it's quite comfortable and exfoliating.", 
        price: 60.50,
      },
      {
        ownerId: 3,
        address: "73152 Woodward Avenue",
        city: "Detroit",
        state: "Michigan", 
        country: "USA", 
        lat: 42.3314, 
        lng: 83.0469, 
        name: "Pew Pew", 
        description: "Spacious, questionable neighborhood. Do you wnat a near-death experience ? Go no further! Spend the night terrified for your life on this bench. (No responsibility taken.)", 
        price: 7.00,
      },
      {
        ownerId: 4,
        address: "31 Telephone Way",
        city: "Providence",
        state: "Rhode Island",
        country: "USA", 
        lat: 11.1677,
        lng: -52.6171,
        name: "Telephone Booth",
        description: "If you want a bizarre experience, stay at the Telephone booth! The great views, panoramic vista, and cramped space will blow your mind! Note: chiropractor not included.",
        price: 23.50,
      },      
      {
        ownerId: 7,
        address: "31 Mainn Rd",
        city: "New Orleans",
        state: "Louisiana",
        country: "USA", 
        lat: 29.951065,
        lng: -90.071533,
        name: "Bus Stop",
        description: "Get out and meet some people. Spend the night at a cozy bus stop in the cultured city of New Orleans. Take in the music, and fall asleep to the starry night and quiet streets",
        price: 11.50,
      },
      {
        ownerId: 6,
        address: "1 Sewer Dr",
        city: "New York City",
        state: "New York",
        country: "USA", 
        lat: 35.1357,
        lng: -52.8324,
        name: "The Sewer Bench",
        description: "Check out the underground world of the sewer systems below New York City's streets. This may or may not be in proximity to the legendary Ninja Turtle's lair. I may or may not be a Ninja Turtle. There may or may not be an intolerable stench that will rewire your knowledge of the periodic table. Have fun!",
        price: 19.50,
      }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(seedData)
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Spots';
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   name: { [Op.in]: ["Wing Chair", "The Bleachers", "The Haunted Bench", "Pew Pew"] }
    // }, {});

    for (const spot of seedData) {
      await Spot.destroy({ where: spot });
    }
  }
};
