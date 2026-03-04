const jwt = require("jsonwebtoken");

exports.generateAccessTokens = (user) => {
    return jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
    );
};

exports.generateRefreshTokens = (user) => {
    return jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};