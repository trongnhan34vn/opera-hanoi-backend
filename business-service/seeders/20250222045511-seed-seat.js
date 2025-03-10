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
    const seatCategories = await queryInterface.sequelize.query(
      `SELECT * FROM business_service_schema.seat_categories;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const seatsData = await queryInterface.sequelize.query(
      'SELECT * FROM business_service_schema.seats;',
      {type: Sequelize.QueryTypes.SELECT}
    )

    if (seatsData.length > 0) {
      return;
    }

    if (!seatCategories.length) {
      throw new Error('No seat categories found. Please seed seat categories first.');
    }

    // Map tên category -> ID
    const categoryMap = {};
    seatCategories.forEach((cat) => {
      categoryMap[cat.name] = cat.id;
    });

    const seats = [];
    for (let i = 1; i <= 24; i++) {
      const row = String.fromCharCode(64 + i); // 'A' -> 'X'

      for (let j = 1; j <= 24; j++) {
        let seatCategoryId;

        // Chia hạng ghế theo vị trí
        if (i >= 1 && i <= 3 && j >= 6 && j <= 18) {
          seatCategoryId = categoryMap['VIP'];
        } else if (i >= 4 && i <= 7 && j >= 4 && j <= 20) {
          seatCategoryId = categoryMap['Premium'];
        } else if (i >= 8 && i <= 14 && j >= 2 && j <= 22) {
          seatCategoryId = categoryMap['Standard'];
        } else {
          seatCategoryId = categoryMap['Economy'];
        }

        seats.push({
          id: uuidv4(),
          code: `${row}${j}`, // "A1", "A2", ...
          seatCategoryId, // Gán seatCategoryId đúng loại ghế
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkDelete(
      { tableName: 'seats', schema: 'business_service_schema' },
      null,
      {}
    );
    await queryInterface.bulkInsert(
      { tableName: 'seats', schema: 'business_service_schema' },
      seats,
      {}
    );
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
