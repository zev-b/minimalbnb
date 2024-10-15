'use strict'; 

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object 
}

const seedData = [
  {
    spotId: 1,
    url: 'https://i.ibb.co/80cwQ66/batman5.png',
    preview: true,
  },
  {
    spotId: 1,
    url: 'https://i.ibb.co/JFx8Zvb/batman0.png',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://i.ibb.co/vvLJt9F/batman2.png',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://i.ibb.co/Qn7WMw0/batman6.png',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://i.ibb.co/m5CvHyP/batman3.png',
    preview: false,
  },

  {
    spotId: 2,
    url: 'https://i.ibb.co/74HD4LT/wing-chair2.png',
    preview: true,
  }, 
  {
    spotId: 2,
    url: 'https://i.ibb.co/5hwb42f/wing-chair.png',
    preview: false,
  }, 
  {
    spotId: 2,
    url: 'https://i.ibb.co/h9V67XH/wing-chair3.png',
    preview: false,
  }, 
  {
    spotId: 2,
    url: 'https://i.ibb.co/xCmYhLM/wing-chair4.png',
    preview: false,
  }, 
  {
    spotId: 2,
    url: 'https://i.ibb.co/c2sHZmW/wing-chair5.png',
    preview: false,
  },

  {
    spotId: 3,
    url: 'https://i.ibb.co/K7xLc67/bleachers.png',
    preview: true,
  }, 
  {
    spotId: 3,
    url: 'https://i.ibb.co/drMVWMV/bleachers2.png',
    preview: false,
  }, 

  {
    spotId: 4, 
    url: 'https://i.ibb.co/s9VVxR8/haunted-bench.png',
    preview: true,
  }, 
  {
    spotId: 4, 
    url: 'https://i.ibb.co/PN91Wzy/haunted-bench2.png',
    preview: false,
  }, 
  {
    spotId: 4, 
    url: 'https://i.ibb.co/87jW60R/haunted-bench3.png',
    preview: false,
  }, 
  {
    spotId: 4, 
    url: 'https://i.ibb.co/ByzdWkk/haunted-bench4.png',
    preview: false,
  },
  {
    spotId: 4, 
    url: 'https://i.ibb.co/QJVx5hC/haunted-bench5.png',
    preview: false,
  },

  {
    spotId: 5, 
    url: 'https://i.ibb.co/svjnGLy/pew-pew.png',
    preview: true,
  },
  {
    spotId: 5,
    url: 'https://i.ibb.co/1z84jkd/pewpew2.png',
    preview: false,
  },
  {
    spotId: 5,
    url: 'https://i.ibb.co/x74c7Sr/pewpew3.png',
    preview: false,
  },
  {
    spotId: 5,
    url: 'https://i.ibb.co/hFFQGQc/pewpew4.png',
    preview: false,
  },
  {
    spotId: 5,
    url: 'https://i.ibb.co/JdznyKJ/pewpew5.png',
    preview: false,
  },

  {
    spotId: 6,
    url: 'https://i.ibb.co/zZyKKDR/telephone-booth1.png',
    preview: true,
  },
  {
    spotId: 6,
    url: 'https://i.ibb.co/9gnmWK9/telephone-booth2.png',
    preview: false,
  },
  {
    spotId: 6,
    url: 'https://i.ibb.co/6YbF5RM/telephone-booth3.png',
    preview: false,
  },
  {
    spotId: 6,
    url: 'https://i.ibb.co/crF99p7/telephone-booth4.png',
    preview: false,
  },
  {
    spotId: 6,
    url: 'https://i.ibb.co/fDWYKHT/telephone-booth5.png',
    preview: false,
  },

  {
    spotId: 7,
    url: 'https://i.ibb.co/0Ms9VcC/bus-stop1.png',
    preview: true,
  },
  {
    spotId: 7,
    url: 'https://i.ibb.co/wB0PYmc/bus-stop2.png',
    preview: false,
  },
  {
    spotId: 7,
    url: 'https://i.ibb.co/HHvqT12/bus-stop3.png',
    preview: false,
  },
  {
    spotId: 7,
    url: 'https://i.ibb.co/2STDm69/bus-stop4.png',
    preview: false,
  },
  {
    spotId: 7,
    url: 'https://i.ibb.co/72w9djH/bus-stop5.png',
    preview: false,
  },

  {
    spotId: 8,
    url: 'https://i.ibb.co/KGYGRP8/sewer-bench2.png',
    preview: true,
  },
  {
    spotId: 8,
    url: 'https://i.ibb.co/Z22kgWG/sewer-bench1.png',
    preview: false,
  },
  {
    spotId: 8,
    url: 'https://i.ibb.co/ydctdp6/sewer-bench5.png',
    preview: false,
  },
  {
    spotId: 8,
    url: 'https://i.ibb.co/NLF58Fr/sewer-bench4.png',
    preview: false,
  },
  {
    spotId: 8,
    url: 'https://i.ibb.co/GW3t5vB/sewer-bench3.png',
    preview: false,
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
