module.exports = class TransactionRepository {
  constructor(mongo) {
    this.mongo = mongo;
  }

  async createTransaction(transactionPayload) {
    try {
      const transaction = await this.mongo
        .Transaction(transactionPayload)
        .save();
      return [transaction, null];
    } catch (error) {
      throw new Error(
        `There was a error in transaction-mongoose-repository.createTransaction ${error.message}`,
      );
    }
  }

  async findAllTransactions() {
    try {
      const transaction = await this.mongo.Transaction.find();
      if (!transaction) return [null, `transactions not found`];
      return [transaction, null];
    } catch (error) {
      throw new Error(
        `There was a error in transaction-mongoose-repository.findTransactionById ${error.message}`,
      );
    }
  }
};
