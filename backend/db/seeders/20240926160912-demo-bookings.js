'use strict';
const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object 
};

const seedData = [
  {
    spotId: 1,
    userId: 3,
    startDate: "2024-11-19T18:06:17Z",
    endDate: "2024-11-20T18:06:17Z",
  },
  {
    spotId: 2,
    userId: 1,
    startDate: "2024-11-26T18:06:17Z",
    endDate: "2024-11-27T18:06:17Z",
  },
  {
    spotId: 3,
    userId: 2,
    startDate: "2024-10-18T18:06:17Z",
    endDate: "2024-10-19T18:06:17Z",
  },
  {
    spotId: 4,
    userId: 1,
    startDate: "2024-10-31T18:06:17Z",
    endDate: "2024-11-01T18:06:17Z",
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate(seedData, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'bookings';
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   startDate: { [Op.in]: [Booking.startDate] }
    // }, {})
    for (const booking of seedData) {
      await Booking.destroy({ where: booking });
    }
  }
};
