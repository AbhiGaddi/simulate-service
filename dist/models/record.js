"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database"); // Assuming you have a database.ts file for Sequelize instance
class Record extends sequelize_1.Model {
}
exports.Record = Record;
Record.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    data: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'records',
});
