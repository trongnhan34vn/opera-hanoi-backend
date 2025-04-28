'use strict';
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
    // seat label sample [main-L1A-A1]
    // {
    //   id:
    //   label:
    //   zoneId:
    // }
    // create main room seats

    // find zones of L1 floor of main room
    try {
      // find seat categories
      const [seatCategories] = await queryInterface.sequelize.query(
        'select * from seat_categories',
      );

      console.log('Init Seats of L1');
      const l1Seats = await initL1Seat(queryInterface, seatCategories);
      if (l1Seats) {
        await queryInterface.bulkInsert('seats', l1Seats);
      }

      console.log('Init Seats of L2');
      const l2Seats = await initL2Seat(queryInterface, seatCategories);
      if (l2Seats) {
        await queryInterface.bulkInsert('seats', l2Seats);
      }

      console.log('Init Seats of L3');
      const l3Seats = await initL3Seat(queryInterface, seatCategories);
      if (l3Seats) {
        await queryInterface.bulkInsert('seats', l3Seats);
      }
    } catch (error) {
      console.log(error);
    }
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

function findSeatCategory(name, seatCategories) {
  const foundSeatCategory = seatCategories.find(
    (seatCategory) => seatCategory.name === name,
  );
  return foundSeatCategory;
}

async function checkIsMigrated(queryInterface, floor) {
  const [createdSeats] = await queryInterface.sequelize
    .query(`select * from seats s
    join business_service_schema.zones z on s."zoneId" = z.id
    join business_service_schema.floors f on f.id = z."floorId"
    where f.label = '${floor}'`);

  if (createdSeats && createdSeats.length > 0) {
    console.log(`Seats of ${floor} floor already migrated`);
    return true;
  }
  return false;
}

async function initL1Seat(queryInterface, seatCategories) {
  // tìm ghế tầng 1. có data r thì ko migrate nữa
  const isMigrated = await checkIsMigrated(queryInterface, 'L1');
  if (isMigrated) return;

  const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();
  const [l1Zones] = await queryInterface.sequelize.query(
    `select z.id, z.label from zones as z
  join business_service_schema.floors f on f.id = z."floorId"
  join business_service_schema.rooms r on r.id = f."roomId"
  where r.label = 'main' and f.label = 'L1';`,
  );

  if (!l1Zones || l1Zones.length === 0) {
    console.log('zone of L1 not found');
    return;
  }

  const aSeatCategory = findSeatCategory('A', seatCategories);
  const bSeatCategory = findSeatCategory('B', seatCategories);
  const vipSeatCategory = findSeatCategory('VIP', seatCategories);

  const l1Seats = [];

  for (const zone of l1Zones) {
    const seats = [];
    // zone A tạo ghế theo hàng và cột
    if (zone.label === 'A') {
      // có tổng 12 hàng
      // từ hàng 1 đến 5 => mỗi hàng bằng hàng trước + 1 ghế & hàng 1 có 20 ghế
      // E 24 ghế, F 23 ghế
      const rowNum = 12;
      let colNum = 20;

      for (let i = 1; i <= rowNum; i++) {
        const labelRow = String.fromCharCode(64 + i);
        let seatCategoryId = '';

        if (labelRow === 'F' || labelRow === 'H') {
          colNum = 23;
        }

        if (labelRow === 'G' || labelRow === 'I') {
          colNum = 22;
        }

        if (labelRow === 'J') {
          colNum = 21;
        }

        for (let j = 1; j <= colNum; j++) {
          const labelCol = j;
          const labelSeat = labelRow + labelCol;

          if (i <= 5) {
            if (j > 12) {
              seatCategoryId = vipSeatCategory.id;
            } else {
              seatCategoryId = aSeatCategory.id;
            }
          } else if (i == 6) {
            if (j > 10) {
              seatCategoryId = vipSeatCategory.id;
            } else {
              seatCategoryId = aSeatCategory.id;
            }
          } else if (i == 7 || i == 8) {
            if (j > 8) {
              seatCategoryId = vipSeatCategory.id;
            } else {
              seatCategoryId = aSeatCategory.id;
            }
          } else if (i == 9) {
            if (j > 6) {
              seatCategoryId = vipSeatCategory.id;
            } else {
              seatCategoryId = aSeatCategory.id;
            }
          } else if (i == 10) {
            if (j > 4) {
              seatCategoryId = vipSeatCategory.id;
            } else {
              seatCategoryId = aSeatCategory.id;
            }
          } else {
            seatCategoryId = vipSeatCategory.id;
          }

          const seat = {
            label: 'ML1' + zone.label + '-' + labelSeat,
            zoneId: zone.id,
            seatCategoryId: seatCategoryId,
            createdAt: currentDate,
            updatedAt: currentDate,
          };
          seats.push(seat);
        }

        if (i <= 5) {
          colNum = colNum + 1;
        }

        if (i >= 10) {
          colNum = colNum - 2;
        }
      }
    } else {
      // các zone khác ghế theo số từ 1 - n65
      let numberOfSeatInZone = 6;

      if (zone.label === 'D' || zone.label === 'G') {
        numberOfSeatInZone = 8;
      }

      if (zone.label === 'E' || zone.label === 'F') {
        numberOfSeatInZone = 14;
      }

      for (let i = 0; i < numberOfSeatInZone; i++) {
        const seat = {
          label: 'ML1' + zone.label + '-' + (i + 1),
          zoneId: zone.id,
          seatCategoryId: bSeatCategory.id,
          createdAt: currentDate,
          updatedAt: currentDate,
        };
        seats.push(seat);
      }
    }

    l1Seats.push(...seats);
    // return await queryInterface.bulkInsert('seats', seats);
  }
  return l1Seats;
}

async function initL2Seat(queryInterface, seatCategories) {
  const isMigrated = await checkIsMigrated(queryInterface, 'L2');
  if (isMigrated) return;

  const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();
  const [l2Zones] = await queryInterface.sequelize
    .query(`select z.id, z.label from zones as z
join business_service_schema.floors f on f.id = z."floorId"
join business_service_schema.rooms r on r.id = f."roomId"
where r.label = 'main' and f.label = 'L2';`);

  if (!l2Zones || l2Zones.length === 0) {
    console.log('zone of L2 not found');
    return;
  }

  const aSeatCategory = findSeatCategory('A', seatCategories);
  const bSeatCategory = findSeatCategory('B', seatCategories);
  const vipSeatCategory = findSeatCategory('VIP', seatCategories);

  const l2Seats = [];

  for (const zone of l2Zones) {
    const seats = [];
    let zoneLabel = zone.label;
    if (zoneLabel === 'A') {
      const rownum = 3;
      for (let i = 0; i < rownum; i++) {
        const rowLabel = String.fromCharCode(65 + i);
        let numOfSeat = 0;
        let seatCategoryId = '';
        if (rowLabel === 'A') {
          seatCategoryId = vipSeatCategory.id;
          numOfSeat = 19;
        }

        if (rowLabel === 'B') {
          seatCategoryId = vipSeatCategory.id;
          numOfSeat = 18;
        }

        if (rowLabel === 'C') {
          numOfSeat = 36;
          seatCategoryId = aSeatCategory.id;
        }

        for (let j = 0; j < numOfSeat; j++) {
          const seatLabel = rowLabel + (j + 1);
          const seat = {
            label: 'ML2' + zone.label + '-' + seatLabel,
            seatCategoryId: seatCategoryId,
            zoneId: zone.id,
            createdAt: currentDate,
            updatedAt: currentDate,
          };
          seats.push(seat);
        }
      }
    } else {
      let numOfSeatInZone = 2;

      if (
        zoneLabel === 'J' ||
        zoneLabel === 'N' ||
        zoneLabel === 'M' ||
        zoneLabel === 'K'
      ) {
        numOfSeatInZone = 4;
      }

      if (zoneLabel === 'L') {
        numOfSeatInZone = 7;
      }

      if (zoneLabel === 'LA' || zoneLabel === 'LB') {
        numOfSeatInZone = 6;
      }

      for (let i = 0; i < numOfSeatInZone; i++) {
        const seat = {
          label: 'ML2' + zone.label + '-' + (i + 1),
          zoneId: zone.id,
          seatCategoryId: bSeatCategory.id,
          createdAt: currentDate,
          updatedAt: currentDate,
        };

        seats.push(seat);
      }
    }
    l2Seats.push(...seats);
  }
  return l2Seats;
}

async function initL3Seat(queryInterface, seatCategories) {
  const isMigrated = await checkIsMigrated(queryInterface, 'L3');
  if (isMigrated) return;

  const currentDate = moment().tz('Asia/Ho_Chi_Minh').format();
  const [l3Zones] = await queryInterface.sequelize.query(
    `select z.id, z.label from zones as z
  join business_service_schema.floors f on f.id = z."floorId"
  join business_service_schema.rooms r on r.id = f."roomId"
  where r.label = 'main' and f.label = 'L3';`,
  );

  if (!l3Zones || l3Zones.length === 0) {
    console.log('zone of L3 not found');
    return;
  }

  const zone = l3Zones[0];

  const seats = [];
  const rowNum = 5;

  const cSeatCategory = findSeatCategory('C', seatCategories);
  const dSeatCategory = findSeatCategory('D', seatCategories);

  for (let i = 0; i < rowNum; i++) {
    const rowLabel = String.fromCharCode(65 + i);
    let seatCategoryId = '';
    let numOfSeat = 26;

    if (rowLabel === 'A') {
      numOfSeat = 15;
    }

    if (rowLabel === 'B') {
      numOfSeat = 18;
    }

    if (rowLabel === 'E') {
      numOfSeat = 24;
    }

    if (rowLabel === 'A' || rowLabel === 'B' || rowLabel === 'C') {
      seatCategoryId = cSeatCategory.id;
    } else {
      seatCategoryId = dSeatCategory.id;
    }

    for (let j = 0; j < numOfSeat; j++) {
      const seatLabel = rowLabel + (j + 1);
      const seat = {
        label: 'ML3' + zone.label + '-' + seatLabel,
        zoneId: zone.id,
        seatCategoryId: seatCategoryId,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      seats.push(seat);
    }
  }

  return seats;
}
