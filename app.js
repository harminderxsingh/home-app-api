require("dotenv").config();
const sequelize = require("./config/db.config");
const express = require("express");
const authRouter = require('./routes/auth');
const communityRouter = require('./routes/community');
const loanRouter = require('./routes/loan');
const projectRouter = require('./routes/project');
const folderRouter = require('./routes/folder');
const fileRouter = require('./routes/file');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("App is working ⚡");
});

app.use('/uploads', express.static('uploads'));

app.use('/auth', authRouter);
app.use('/communities', communityRouter);
app.use('/loan', loanRouter);
app.use('/project', projectRouter);
app.use('/folder', folderRouter);
app.use('/file', fileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const seedData = async () => {
  const { Folder } = require('./models');
  const count = await Folder.count();
  if (count === 0) {
    const folders = [
      'Floor plans',
      'Tutorials',
      'Contracts',
      'Warranties',
      'Miscellaneous',
      'Deleted Documents'
    ];

    for (const folderName of folders) {
      await Folder.create({ name: folderName });
    }

    console.log('Folders have been seeded successfully.');
  } else {
    console.log('Folders table is not empty. Skipping seeding.');
  }
};

sequelize.sync({ alter: true }).finally(() => {
  seedData()
});

