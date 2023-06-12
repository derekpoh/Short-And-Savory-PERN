const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser")
require('dotenv').config();
const { connectDatabase } = require('./config/database');

const app = express();
const port = process.env.PORT;
const usersRouter = require("./routes/usersRouter");
const recipesRouter = require("./routes/recipesRouter");
const searchRouter = require("./routes/searchRouter");


app.use(logger("dev"));
app.use(bodyParser.json({ limit: "10mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb"}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(require('./config/checkToken'));
app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter)
app.use("/api/search", searchRouter)

app.get("/api", (req, res) => {
    res.send("Server working");
  });

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  
connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
