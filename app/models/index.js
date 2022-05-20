const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: 0,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   },
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false 
//     }
//   },
// });

const sequelize = new Sequelize({
  database: "d7t5tl94gkfnnr",
  username: "rrdawbzghdaatc",
  password: "7600a8d11a98732cd42bcc9b958d2e994ba8b5bcc613e0343b2bbf6077edfee3",
  host: "ec2-3-231-82-226.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

//new

//roles
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];


//


module.exports = db;
