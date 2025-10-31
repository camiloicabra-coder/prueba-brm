
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false, // desactiva logs de SQL en consola
  }
);

const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error(' Error al conectar a la base de datos:', error);
  }
};

module.exports = { sequelize, conectarDB };
