'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();

    const [createdSeatCategories] = await queryInterface.sequelize.query(`Select * from seat_categories`)

    if (createdSeatCategories && createdSeatCategories.length > 0) {
      console.log('Seat Category was migrated');
      return;
    }

    const seatCategories = [
      {
        id: uuidv4(),
        name: 'VIP',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: uuidv4(),
        name: 'A',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: uuidv4(),
        name: 'B',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: uuidv4(),
        name: 'C',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: uuidv4(),
        name: 'D',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ];

    await queryInterface.bulkInsert('seat_categories', seatCategories);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
