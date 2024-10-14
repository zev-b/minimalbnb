'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const seedData = [
  {
    firstName: "Marc",
    lastName: "Depot",
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('demolizer')
  },
  {
    firstName: "Marked",
    lastName: "Depotted",
    email: 'user1@user.io',
    username: 'LarryTest',
    hashedPassword: bcrypt.hashSync('hilarrious')
  },
  {
    firstName: "Marque",
    lastName: "Depotte",
    email: 'user2@user.io',
    username: 'FrankTest',
    hashedPassword: bcrypt.hashSync('frankly')
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(seedData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   username: { [Op.in]: ['Demo-lition', 'LarryTest', 'FrankTest'] }
    // }, {});
    for (const user of seedData) {
      await User.destory({ where: user });
    }
  }
};
