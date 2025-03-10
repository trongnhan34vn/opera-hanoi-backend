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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "Category",
      tableName: "categories",
      timestamps: true, // ✅ Bật timestamps để tự động quản lý thời gian
    }
  );

  return Seat;
};
