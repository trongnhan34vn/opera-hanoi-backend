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
    const seatCategoryData = await queryInterface.sequelize.query(
      "SELECT * FROM business_service_schema.seat_categories;",
      {type: Sequelize.QueryTypes.SELECT}
    );

    if (seatCategoryData.length > 0) {
      return;
    }

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

    await queryInterface.bulkDelete(
      { tableName: 'seat_categories', schema: 'business_service_schema' },
      null,
      {},
    );

    await queryInterface.bulkInsert(
      {
        tableName: 'seat_categories',
        schema: 'business_service_schema',
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
      { tableName: 'seat_categories', schema: 'business_service_schema' },
      null,
      {},
    );
  },
};
