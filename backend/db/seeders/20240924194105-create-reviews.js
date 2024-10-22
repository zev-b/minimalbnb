'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object 
}

const seedData = [
  {
    spotId: 2,
    userId: 2,
    review: "Spacious yard really feel one with nature.",
    stars: 4,
  },
  {
    spotId: 2,
    userId: 4,
    review: "Great getaway for myself. Its hard at work to get peace and quiet so I am batma-, sorry, I meant to say that I recommend visiting in the dead of winter to have the full experience.",
    stars: 5,
  },
  {
    spotId: 2,
    userId: 3,
    review: "This is not safe. First off, there were no marshmellos, so not safe at all.",
    stars: 1,
  },
  {
    spotId: 3,
    userId: 8,
    review: "After the team lost the game in the 9th inning, I knew I couldn't just go home like everyone else. I replayed that base-hit in my head all night.",
    stars: 4,
  },
  {
    spotId: 3,
    userId: 7,
    review: "Ninjas can play baseball too!",
    stars: 3,
  },
  {
    spotId: 4,
    userId: 4,
    review: "Felt right at home, very cozy.",
    stars: 4,
  },
  {
    spotId: 4,
    userId: 5,
    review: "I think the ghost was watching tv all night. I couldn't get any sleep. Bad hospitality. Good neighbors though.",
    stars: 4,
  },
  {
    spotId: 5,
    userId: 1,
    review: "Good vibes. Bad times.",
    stars: 3,
  },
  {
    spotId: 6,
    userId: 4,
    review: "So this is how the 'Man of Steel' did it? Not so strategic after all.",
    stars: 4,
  },
  {
    spotId: 7,
    userId: 6,
    review: "Jamming to the tunes and drumming to the-... I can't think of a ryhme at the moment.",
    stars: 5,
  },
  {
    spotId: 8,
    userId: 8,
    review: "Hey ! you can't rent this out, this is my yoga bench.",
    stars: 1,
  },

]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(seedData, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   review: { [Op.in]: ["Spacious yard really feel one with nature.", "THE PARTY PLACE!", "Great experience but, Something kept touching my feet.", "Beautiful art, only heard one pew though."] }
    // }, {})
    for (const review of seedData) {
      await Review.destroy({ where: review });
    }
  }
};
