const transformUser = (user) => {
    if (Array.isArray(user)) {
        return user.map((item) => {
            return {
                id: item._id,
                email: item.email,
            };
        });
    }
    return {
        id: user._id,
        email: user.email,
    };
};

const UserUtils = {
    transformUser,
};

module.exports = UserUtils;
