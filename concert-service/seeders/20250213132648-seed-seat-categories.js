'use strict';
const { v4: uuidv4 } = require('uuid');

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
    const stringOfSeatCategories = ['VIP', 'Standard', 'Premium', 'Economy'];
    const seatCategories = [];
    for (const stringOfSeatCategory of stringOfSeatCategories) {
      const category = {
        id: uuidv4(),
        name: stringOfSeatCategory,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };
      seatCategories.push(category);
    }

    await queryInterface.bulkInsert(
      {
        tableName: 'seat_categories',
        schema: 'concert_service_schema',
      },
      seatCategories,
      {},
    );
    console.log('Seeding seat_categories success!');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      { tableName: 'seat_categories', schema: 'concert_service_schema' },
      null,
      {},
    );
  },
};
