import { Sequelize } from "sequelize";

const dbei = new Sequelize("indah_dev", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default dbei;
