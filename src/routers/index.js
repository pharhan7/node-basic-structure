const userRouter = require("./userRoute.js");
const appRouter = async (app) => {
    app.use("/api/v1", userRouter);
}

module.exports = appRouter;