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
    // L1 has 12 zones; A - L
    // L2 has 25 zones; A - V
    // L3 has 1 zone; A

    const [zoneQueries] = await queryInterface.sequelize.query(
      'select * from zones',
    );

    if (zoneQueries && zoneQueries.length > 0) {
      console.log('Zones already seeder');
      return;
    }

    const [floors] = await queryInterface.sequelize.query(
      `SELECT * from business_service_schema.floors`,
    );

    let zones = [];

    floors.forEach((floor) => {
      zones.push(...generateZones(floor));
    });

    return await queryInterface.bulkInsert('zones', zones);
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

function generateZonesByFloor(number, floorId) {
  const zones = [];
  const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();
  let isL2 = false;
  if (number === 25) {
    isL2 = true;
  }

  for (let i = 0; i < number; i++) {
    const zone = {
      id: uuidv4(),
      label: String.fromCharCode(65 + i),
      floorId: floorId,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    zones.push(zone);
  }
  if (isL2) {
    const LAZone = {
      id: uuidv4(),
      label: 'LA',
      floorId: floorId,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    const LBZone = {
      id: uuidv4(),
      label: 'LB',
      floorId: floorId,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    zones.push(LAZone);
    zones.push(LBZone);
  }

  return zones;
}

function generateZones(floor) {
  const floorLabel = floor.label;

  switch (floorLabel) {
    case 'L1':
      const numOfZoneL1 = 12;
      return generateZonesByFloor(numOfZoneL1, floor.id);
    case 'L2':
      const numOfZoneL2 = 25;
      return generateZonesByFloor(numOfZoneL2, floor.id);
    default:
      const numOfZoneL3 = 1;
      return generateZonesByFloor(numOfZoneL3, floor.id);
  }
}
