const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const appRouter = require("./routers/index.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));




appRouter(app);
module.exports = app;