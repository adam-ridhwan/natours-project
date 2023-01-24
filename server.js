/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('\x1b[31m', '❌ UNCAUGHT EXCEPTION! Shutting down...', '\x1b[0m');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log('\x1b[32m', '✅ Database connection successful!', '\x1b[0m')
  );

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('\x1b[36m', `⚙️  App running on port ${port}...`, '\x1b[0m');
});

process.on('unhandledRejection', (err) => {
  console.log(
    '\x1b[31m',
    '❌ UNHANDLED REJECTION! Shutting down...',
    '\x1b[0m'
  );
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
