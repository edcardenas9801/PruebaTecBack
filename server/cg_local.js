var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: "",
  user: "root",
  database: "evolution_db",
  password: ""
});

module.exports = connection;
