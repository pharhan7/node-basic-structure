require('dotenv').config();
const app = require("./src/app.js");
const {db} = require("./config/index.js");
const mongoose = require('mongoose');

(
    async () => {
        try {
            await db();
            console.log("Database connected successfully");
            
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        } catch (error) {
            console.error("Database connection failed: ", error);
        }
    }
)()
function shutdown() {
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected due to app termination');
        process.exit(0);
    });
}

process.on('SIGINT', shutdown).on('SIGTERM', shutdown);