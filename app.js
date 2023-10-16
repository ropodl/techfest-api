const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression');

require("express-async-errors");


// const { ErrorResponseObject } = require('./common/http');
const { errorHandler, handleNotFound } = require("./middleware/errorHandler");
const routes = require('./routes');

require("dotenv").config();
require("./config/db.js")
// require("./config/app.js")

const app = express();

app.use("/uploads/", express.static('uploads'));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(compression({ level: 9 }))
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(express.json({ limit: '50mb' }));

app.use('/api/v1', routes);
app.get("/api/v1/test", (req, res) => {
    res.json("test")
})

// default catch all handler
app.use("/*", handleNotFound);
app.use(errorHandler);
// Host app
if (process.env.app_port) {
    app.listen(process.env.app_port, (error) => {
        if (error) console.log(error)
        console.log(`localhost:${process.env.app_port}`)
    })
}

module.exports = app;
