require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO_URL);
    console.log('MongoDb Connected ...💾🍃');
  } catch (error) {
    console.log('Error ============');
    console.log(error);
    process.exit(1);
  }
};
