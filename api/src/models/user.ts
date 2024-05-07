import sequelize from '../libs/db'
import { DataTypes } from 'sequelize'

const userModel = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.BIGINT,
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
    },
    avater: {
      type: DataTypes.STRING,
      field: 'avater',
    },
    phone: {
      type: DataTypes.STRING,
      field: 'phone',
    },
    gender:{
      type: DataTypes.INTEGER,
      field: 'gender',
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      field: 'birthDate',
    },
    location: {
      type: DataTypes.STRING,
      field: 'location',
    },
    desc: {
      type: DataTypes.STRING,
      field: 'desc',
    },
  },
  {
    tableName: 'user',
  }
)
export type UserModel = typeof userModel
export default userModel
