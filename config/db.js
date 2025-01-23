const mongoose = require('mongoose');

const { DB_URI } = process.env;
const db = async () => {
    console.log(`Connecting to database...`);
    mongoose.connection
        .on("error", (err) =>
            console.log("database connection failed", err.message)
        )
        .on("open", () => console.log("Database connection is open"))
        .on("connected", () => console.log("Database connection established."))
        .on("disconnected", () => console.log("Database disconnected"));

    return new Promise((resolve, farhan) => {
        mongoose
            .connect(DB_URI)
            .then(resolve)
            .catch((err) => {
                console.log("unable to connect to database:", err.meaasge);
                mongoose.connection.close();
                farhan(err);
            });
    });
};

module.exports = db;



