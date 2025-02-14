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
    const stringOfCategories = [
      'Giao hưởng',
      'Ballet',
      'Kịch',
      'Ca nhạc',
      'Liveshow',
      'Xiếc',
      'Sự kiện',
    ];
    const categories = [];
    for (const stringOfCategory of stringOfCategories) {
      const category = {
        id: uuidv4(),
        title: stringOfCategory,
        description: null,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };
      categories.push(category);
    }

    await queryInterface.bulkInsert(
      {
        tableName: 'categories',
        schema: 'concert_service_schema',
      },
      categories,
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
      { tableName: 'categories', schema: 'concert_service_schema' },
      null,
      {},
    );
  },
};
