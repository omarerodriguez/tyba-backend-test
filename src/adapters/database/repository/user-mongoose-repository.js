module.exports = class UserRepository {
  constructor(mongo) {
    this.mongo = mongo;
  }

  async createUser(userPayload) {
    try {
      const user = await this.mongo.User(userPayload).save();
      return [user, null];
    } catch (error) {
      throw new Error(
        `There was a error in user-mongoose-repository.CreateCustomer ${error.message}`,
      );
    }
  }

  async findUserById(userId) {
    try {
      const user = await this.mongo.User.findById(userId);
      if (!user) return [null, `user with Id:${userId} not found`];
      return [user, null];
    } catch (error) {
      throw new Error(
        `There was a error in user-mongoose-repository.findUserById ${error.message}`,
      );
    }
  }

  async findUserByEmail(emailUser) {
    try {
      const user = await this.mongo.User.findOne({
        email: emailUser,
      });
      return [user, null];
    } catch (error) {
      throw new Error(
        `There was a error in user-mongoose-repository.findUserByEmail ${error.message}`,
      );
    }
  }
};
