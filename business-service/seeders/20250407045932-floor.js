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
    const [floorQueries] = await queryInterface.sequelize.query(
      'select * from floors'
    )

    if (floorQueries && floorQueries.length > 0) {
      console.log('Floors already seeder');
      return;
    } 


    const rooms = await queryInterface.sequelize.query(
      `SELECT * from business_service_schema.rooms WHERE rooms.label = 'main'`,
    );
    const mainRoom = rooms[0][0];
    
    if (!mainRoom) {
      throw new Error('Room Query Error');
    }
    const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();
    const floors = [
      {
        id: uuidv4(),
        label: 'L1',
        roomId: mainRoom?.id,
        createdAt: currentDate,
        updatedAt: currentDate
      },

      {
        id: uuidv4(),
        label: 'L2',
        roomId: mainRoom?.id,
        createdAt: currentDate,
        updatedAt: currentDate
      },

      {
        id: uuidv4(),
        label: 'L3',
        roomId: mainRoom?.id,
        createdAt: currentDate,
        updatedAt: currentDate
      },
    ];
    return await queryInterface.bulkInsert('floors', floors);
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
