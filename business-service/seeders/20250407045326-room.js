'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const [rooms] = await queryInterface.sequelize.query(
      'select * from rooms'
    )

    if (rooms && rooms.length > 0) {
      console.log('Rooms already seeder');
      return;
    } 

    const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();
    return await queryInterface.bulkInsert('rooms', [
      {
        id: uuidv4(),
        label: 'main',
        createdAt: currentDate,
        updatedAt: currentDate,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
