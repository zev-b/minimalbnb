'use strict'; 

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object 
}

const seedData = [
  {
    spotId: 1,
    url: 'https://pomf2.lain.la/f/5tmttbkp.png',
    preview: true,
  }, 
  {
    spotId: 1,
    url: 'https://i.ibb.co/74HD4LT/wing-chair2.png',
    preview: false,
  }, 
  {
    spotId: 2,
    url: 'https://i.ibb.co/K7xLc67/bleachers.png',
    preview: true,
  }, 
  {
    spotId: 3,
    url: 'https://i.ibb.co/s9VVxR8/haunted-bench.png',
    preview: true,
  }, 
  {
    spotId: 4, 
    url: 'https://i.ibb.co/svjnGLy/pew-pew.png',
    preview: true,
  }, 
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(seedData, { validate: true })
  }, //{ validate: true }

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   url: { [Op.in]: ['../assets/wing-chair.png', '../assets/wing-chair2.png', '../assets/bleachers.png', '../assets/haunted-bench.png', '../assets/pew-pew.png'] }
    // }, {})
    for (const img of seedData) {
      await SpotImage.destroy({ where: img });
    }
  }
};
