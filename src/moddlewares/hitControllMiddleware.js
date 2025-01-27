const apiLimmiter = require("express-rate-limit");
const hitControllMiddleware = apiLimmiter({
  windowMs: 5 * 60 * 1000,
  max: 1,
  message: "You have exceeded the 100 requests in 15 minutes limit!",
  headers: true,
});

module.exports = hitControllMiddleware;