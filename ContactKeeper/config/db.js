const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDb connected');
  } catch (err) {
    console.log(err.messages);
    process.exit(1);
  }
};

module.exports = connectDB;
