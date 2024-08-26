module.exports = class TransactionHandler {
  constructor(transactionUseCase) {
    this.transactionUseCase = transactionUseCase;
  }

  createTransaction = async (req, res) => {
    try {
      if (!res.locals?.decodedToken)
        return res.status(400).send({
          message: 'fail',
          errors: 'TokenBody is required',
        });
      const { decodedToken } = res.locals ?? null;
      const [transaction, status, error] =
        await this.transactionUseCase.createTransaction(req.body, decodedToken);

      if (error) {
        return res.status(status).send({
          message: fail,
          error: error.message,
        });
      }
      return res.status(status).send({
        data: transaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };

  findAllTransactions = async (req, res) => {
    try {
      const [transactions, status, error] =
        await this.transactionUseCase.FindAllTransactions();
      if (error)
        return res.status(status).send({
          message: 'fail',
          errors: error.message,
        });
      return res.status(status).send({
        message: 'success',
        data: transactions,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error.message,
      });
    }
  };
};
