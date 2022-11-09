import { Sequelize } from "sequelize";

const dbei = new Sequelize("indah_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default dbei;
