'use strict';
const { v4: uuidv4 } = require("uuid");

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
    const seats = [];
    for (let i = 1; i <= 24; i++) {
      const row = String.fromCharCode(64 + i);
      for (let j = 1; j <= 24; j++) {
        const seatCode = row + j;
        seats.push({
          id: uuidv4(),
          code: seatCode ,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        });

      }
    }

    await queryInterface.bulkInsert({tableName: 'seats', schema: 'concert_service_schema'}, seats, {});
    console.log("Seeding seats success!");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('seats', null, {});
  },
};
