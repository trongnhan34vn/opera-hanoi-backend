'use strict';
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const {
  CodeGenerator,
} = require('../node_modules/common/dist/utils/code.generate.util');

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
    const genreStrings = [
      'Giao hưởng',
      'Ballet',
      'Kịch',
      'Ca nhạc',
      'Liveshow',
      'Xiếc',
      'Sự kiện',
    ];
    const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();
    const genres = [];
    const [createdGenres] = await queryInterface.sequelize.query(
      'Select * from genres',
    );
    if (createdGenres && createdGenres.length > 0) {
      console.log('Genre already migrated');
      return;
    }

    for (const genreString of genreStrings) {
      const id = uuidv4();
      const genre = {
        id: id,
        title: genreString,
        code: CodeGenerator.generateCode('GEN', id),
        description: genreString,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      genres.push(genre);
    }
    await queryInterface.bulkInsert('genres', genres);
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
