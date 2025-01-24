require('dotenv').config();
const app = require("./src/app.js");
const {db} = require("./config/index.js");
const mongoose = require('mongoose');
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    console.log(`Worker ${process.pid} started`);
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
    )();
}


function shutdown() {
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected due to app termination');
        process.exit(0);
    });
}

process.on('SIGINT', shutdown).on('SIGTERM', shutdown);