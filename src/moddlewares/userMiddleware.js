const { User } = require('../models');
const jwt = require('jsonwebtoken');

const userMiddleware = async(req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) throw new Error('Token not found');
        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) throw new Error('Invalid token');
        const user = await User.findByPk(decoded.id);
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = userMiddleware;