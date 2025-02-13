"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Seat extends Model {
    static associate(models) {
      // define association here (nếu cần)
    }
  }

  Seat.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // ✅ Tạo UUID tự động
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM('VIP', 'Standard', 'Premium', 'Economy'),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      sequelize,
      schema: "concert_service_schema",
      modelName: "SeatCategory",
      tableName: "seat_categories",
      timestamps: true, // ✅ Bật timestamps để tự động quản lý thời gian
    }
  );

  return Seat;
};
