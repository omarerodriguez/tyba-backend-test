module.exports = class TransactionUseCases {
  constructor(googlePlacesRepository, transactionRepository) {
    this.googlePlacesRepository = googlePlacesRepository;
    this.transactionRepository = transactionRepository;
  }

  async createTransaction(transactionPayload, decodedToken) {
    const { restaurantId } = transactionPayload;
    const { userId } = decodedToken;

    const [findRestaurant, findRestaurantError] =
      await this.googlePlacesRepository.searchRestaurantById(restaurantId);
    if (findRestaurantError) return [null, 400, findRestaurantError];

    const status = Math.random() > 0.5 ? 'completed' : 'failed';
    // Create the transaction
    const newTransaction = {
      ...transactionPayload,
      userId,
      status: status,
    };
    const [transaction, error] =
      await this.transactionRepository.createTransaction(newTransaction);
    if (error) return [null, 400, error];
    await transaction.save();
    return [transaction, 200, null];
  }

  async FindAllTransactions() {
    const [transactions, error] =
      await this.transactionRepository.findAllTransactions();
    if (error) return [null, 404, error];
    return [transactions, 200, null];
  }
};
