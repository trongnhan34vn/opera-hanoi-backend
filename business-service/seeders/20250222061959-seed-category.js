'use strict';
const { v4: uuidv4 } = require('uuid');
const { CodeGenerator } = require('common-lib');

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
    const categoryData = await queryInterface.sequelize.query(
      "SELECT * FROM business_service_schema.categories;", {
        type: Sequelize.QueryTypes.SELECT
      }
    )

    if (categoryData.length > 0) {
      return;
    }

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
      const id = uuidv4();
      const category = {
        id: id,
        title: stringOfCategory,
        code: CodeGenerator.generateCode('CAT', id),
        description: null,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      };
      categories.push(category);
    }

    await queryInterface.bulkDelete(
      { tableName: 'categories', schema: 'business_service_schema' },
      null,
      {},
    );
    await queryInterface.bulkInsert(
      {
        tableName: 'categories',
        schema: 'business_service_schema',
      },
      categories,
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      { tableName: 'categories', schema: 'business_service_schema' },
      null,
      {},
    );
  },
};
