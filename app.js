const sequelize = require("./config/db.config");
require("dotenv").config();
const express = require("express");
const authRouter = require('./routes/auth');
const communityRouter = require('./routes/community');

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("App is working ⚡");
});
app.use('/auth', authRouter);
app.use('/communities', communityRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

sequelize.sync({ alter: true });
