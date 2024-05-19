const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRoutes");

app.use("/", indexRouter);
app.use("/", userRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
