import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Assuming you have a database.ts file for Sequelize instance
export class Record extends Model<any, any> {
  public id!: number;
  public type!: string;
  public timestamp!: Date;
  public data!: object; // JSONB field for dynamic data

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'records',
  }
);