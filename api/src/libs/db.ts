'use strict'

import { Sequelize } from 'sequelize'
import Config from '../config/index'

interface MysqlConfig {
  database: string
  user: string
  password: string
  host: string
  port: number
}

const mysqlConfig: MysqlConfig = Config.mysql
const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    timezone: '+08:00',
  }
)

sequelize.sync({ alter: true })

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })


export default sequelize
