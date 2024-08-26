require('dotenv').config();
const mongoose = require('mongoose');
const { User, Transaction } = require('../../adapters/database/model/index');
const AuthUseCases = require('../../applications/auth-usecases');

const authUseCases = new AuthUseCases(require('jsonwebtoken'));

mongoose.connect(process.env.DB_MONGO_URL);

const run = async () => {
  try {
    // Generate salt and hashed password
    const [salt, hashedPassword] = await authUseCases.generatePassword(
      'user123',
    );
    /**Create a new transaction */
    const transactions = [
      {
        amount: 95000,
        status: 'completed',
        userId: '66cbdbd926069d45753f3193',
        restaurantId: 'ChIJKevArcct9I4R_zVjZ0yfKyA',
      },
      {
        amount: 200000,
        status: 'completed',
        userId: '66cbdbd926069d45753f3193',
        restaurantId: 'ChIJb-WSbwot9I4R0iQcadfSm3Y',
      },
      {
        amount: 280000,
        status: 'failed',
        userId: '66cbdbd926069d45753f3193',
        restaurantId: 'ChIJX0H2pHUt9I4RCO6t_dq8PhI',
      },
    ];
    await Transaction.insertMany(transactions);
    console.log('Transaction created:', transactions);
  } catch (error) {
    console.error('Error populating data:', error);
  } finally {
    /**Close the connection to the database */
    mongoose.connection.close();
  }
};

run();
