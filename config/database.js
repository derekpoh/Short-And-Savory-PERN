require('dotenv').config({ path: '../.env' });


const {Client} = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: `${process.env.DB_PASSWORD}`,
  database: "Capstone"
});

client.connect();

client.query(`SELECT * FROM users`, (err, res) => {
  if(!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end();
})


