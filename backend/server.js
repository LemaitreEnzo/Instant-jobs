const app = require("./app");
require("dotenv").config();
const sequelize = require("./config/db");

sequelize.sync().then(() => {
  app.listen();
});
