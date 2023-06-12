require('dotenv').config({ path: '../.env' });
const {Client} = require("pg");


const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: `${process.env.DB_PASSWORD}`,
  database: "Capstone"
});

const connectDatabase = async () => {
  try {
    await client.connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = {
  client,
  connectDatabase,
};


