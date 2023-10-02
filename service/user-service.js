const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserModel = require('../models/user-model');
const UserUtils = require('../utils/user-utils');
const ApiError = require('../exceptions/api-error');

const UserService = {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(
                `Пользователь с таким почтовым адресом уже существует`
            );
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({ email, password: hashPassword });
        const transformedUser = UserUtils.transformUser(user);
        const tokens = tokenService.generateTokens({ ...transformedUser });

        await tokenService.saveToken(transformedUser.id, tokens.refreshToken);
        return { ...tokens, user: transformedUser };
    },
    async login(email, password) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const transformedUser = UserUtils.transformUser(user);
        const tokens = tokenService.generateTokens({ ...transformedUser });

        await tokenService.saveToken(transformedUser.id, tokens.refreshToken);
        return { ...tokens, user: transformedUser };
    },
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    },
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.BadRequest('Refresh token отсутствует');
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const transformedUser = UserUtils.transformUser(user);
        const tokens = tokenService.generateTokens({ ...transformedUser });

        await tokenService.saveToken(transformedUser.id, tokens.refreshToken);
        return { ...tokens, user: transformedUser };
    },
    async getAllUsers() {
        const users = await UserModel.find();
        const transformedUsers = UserUtils.transformUser(users);
        return transformedUsers;
    },
};

module.exports = UserService;
