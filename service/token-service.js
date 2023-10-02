const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
const TokenError = require('../exceptions/token-error');
const ApiError = require('../exceptions/api-error');

const TokenService = {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);
        return {
            accessToken,
            refreshToken,
        };
    },
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            throw ApiError.BadRequest(TokenError.INCORRECT_ACCESS_TOKEN);
        }
    },
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            throw ApiError.BadRequest(TokenError.INCORRECT_REFRESH_TOKEN);
        }
    },
    async saveToken(userId, refreshToken) {
        try {
            const tokenData = await tokenModel.findOne({ user: userId });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            const token = await tokenModel.create({
                user: userId,
                refreshToken,
            });
            return token;
        } catch (e) {
            throw ApiError.BadRequest(TokenError.NOT_SAVE_TOKEN);
        }
    },
    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    },
    async findToken(refreshToken) {
        try {
            const tokenData = await tokenModel.findOne({ refreshToken });
            return tokenData;
        } catch (e) {
            throw ApiError.BadRequest(TokenError.NOT_FIND_TOKEN);
        }
    },
};

module.exports = TokenService;
