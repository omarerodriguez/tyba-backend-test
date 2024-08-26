/**Repositories */
const UserRepository = require('../../../src/adapters/database/repository/user-mongoose-repository');
/**UseCases */
const UserUseCases = require('../../../src/applications/user-usecases');
const AuthUseCases = require('../../../src/applications/auth-usecases');

/**MOCKS */
/**USER */
const mockFindUserById = jest.fn();
const mockCreateUser = jest.fn();
const mockFindUserByEmail = jest.fn();
const mockGeneratePassword = jest.fn();

/**AUTH */
const mockGenerateToken = jest.fn();

jest.mock(
  '../../../src/adapters/database/repository/user-mongoose-repository.js',
  () =>
    jest.fn().mockImplementation(() => ({
      findUserById: mockFindUserById,
      createUser: mockCreateUser,
      findUserByEmail: mockFindUserByEmail,
    })),
);

jest.mock('../../../src/applications/auth-usecases.js', () =>
  jest.fn().mockImplementation(() => ({
    generatePassword: mockGeneratePassword,
    generateToken: mockGenerateToken,
  })),
);

describe('test in User usecases', () => {
  let userUseCases;
  let userPayload;

  const userExpect = {
    _id: '66cbdbd926069d45753f3193',
    username: 'omar',
    email: 'omarmr7214@gmail.com',
    phone: '3002691428',
    city: 'barranquilla',
    createdAt: '2024-08-26T01:35:21.056Z',
    updatedAt: '2024-08-26T01:35:21.056Z',
  };
  beforeAll(() => {
    /**Intances Repository */
    const userPrismaRepository = new UserRepository();
    /**Intances UseCase */
    const authUseCases = new AuthUseCases();
    userUseCases = new UserUseCases(userPrismaRepository, authUseCases);

    userPayload = {
      username: 'omar',
      email: 'omarmr7214@gmail.com',
      password: '3002691428',
      phone: '3002691428',
      city: 'barranquilla',
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
    /**Initial Values */
  });
  mockFindUserById.mockResolvedValue([userExpect, null]);
  mockFindUserByEmail.mockResolvedValue([userExpect, null]);
  mockGeneratePassword.mockResolvedValue(['randomSalt', 'hashedPassword']);
  mockGenerateToken.mockResolvedValue(['mockedToken', null]);

  mockCreateUser.mockResolvedValue([
    {
      username: 'omar',
      email: 'omarmr7214@gmail.com',
      password: '3002691428',
      phone: '3002691428',
      city: 'barranquilla',
    },
    null,
  ]);

  test('create new user but email already exist', async () => {
    const [user, status, error] = await userUseCases.RegisterUser(userPayload);
    expect(status).toBe(400);
    expect(error).toBe('Email already exist');
    expect(user).toBeNull();
  });

  test('find user by id', async () => {
    const expectedUserId = '65c263a0ad14bfde56c062c3';
    const [user, status, error] = await userUseCases.findUserById(
      expectedUserId,
    );
    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(user).toEqual(userExpect);
  });
});
