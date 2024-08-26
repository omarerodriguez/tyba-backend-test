module.exports = class UserUseCases {
  constructor(userRepository, authUseCases, tokenBlacklist) {
    this.authUseCases = authUseCases;
    this.userRepository = userRepository;
    this.tokenBlacklist = tokenBlacklist;
  }

  RegisterUser = async (userPayload) => {
    const [findUser, findError] = await this.userRepository.findUserByEmail(
      userPayload.email,
    );
    if (findUser) {
      return [null, 400, 'Email already exist'];
    }

    const [salt, hashedPassword] = await this.authUseCases.generatePassword(
      userPayload.password,
    );

    const userPayloadWithHashedPassword = {
      ...userPayload,
      password: hashedPassword,
      salt: salt,
    };
    const [user, error] = await this.userRepository.createUser(
      userPayloadWithHashedPassword,
    );
    if (error) return [null, 400, error];

    const [token, tokenError] = await this.authUseCases.generateToken(user.id);
    if (tokenError) return [null, 400, tokenError];

    return [user, token, 201, null];
  };

  login = async (log) => {
    const { email, password } = log;
    const [user, , error] = await this.findUserByEmail(email);

    if (error) {
      throw new Error('Email not found or type error');
    }

    const isPasswordMatch = await this.authUseCases.verifyPassword(
      password,
      user.password,
      user.salt,
    );
    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    delete user.password;
    delete user.salt;

    const [token, tokenError] = await this.authUseCases.generateToken(user._id);

    if (tokenError) return [null, 400, tokenError];
    return [user, token, 200, null];
  };

  logout = async (token) => {
    if (!token) return [null, 400, 'Token is required'];

    // Add token to blacklist
    const [, error] = await this.authUseCases.blacklistToken(token);
    if (error) return [null, 400, error];

    return [null, 200, null];
  };

  findUserById = async (userId) => {
    const [findCustomer, error] = await this.userRepository.findUserById(
      userId,
    );
    if (error) return [null, 404, 'User not found'];
    return [findCustomer, 200, error];
  };

  findUserByEmail = async (userEmail) => {
    const [findUser, error] = await this.userRepository.findUserByEmail(
      userEmail,
    );
    if (error) return [null, 404, 'User not found'];
    return [findUser, 200, error];
  };
};
