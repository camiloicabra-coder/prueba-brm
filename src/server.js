
const dotenv = require('dotenv');
const { conectarDB } = require('./config/database');
const { sequelize } = require('./models');
const app = require('./app'); // traemos la configuración desde app.js

dotenv.config();

(async () => {
  await conectarDB();
  try {
    await sequelize.sync({ alter: true });
    console.log(' Modelos sincronizados con la base de datos');
  } catch (err) {
    console.error(' Error al sincronizar modelos:', err);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(` Servidor corriendo en el puerto ${PORT}`));
})();
