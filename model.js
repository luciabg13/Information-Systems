const { Sequelize, DataTypes } = require('sequelize');

// Configura Sequelize para usar SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'mi_base_de_datos.db'
});

// Conectar y sincronizar la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
    
    await sequelize.sync({ force: true }); // Sincroniza los modelos con la base de datos
    console.log('La base de datos ha sido sincronizada.');

  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
})();
