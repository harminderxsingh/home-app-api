require("dotenv").config();
const sequelize = require("./config/db.config");
const express = require("express");
const authRouter = require('./routes/auth');
const communityRouter = require('./routes/community');
const loanRouter = require('./routes/loan');
const projectRouter = require('./routes/project');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }))

app.get("/", (req, res) => {
  res.send("App is working ⚡");
});
app.use('/auth', authRouter);
app.use('/communities', communityRouter);
app.use('/loan', loanRouter);
app.use('/project', projectRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

sequelize.sync({ alter: true });
