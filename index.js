require("dotenv").config();
const path = require('path');
const favicon = require('serve-favicon');
const { handleInvalidJson, handleUnauthorized, handleNotFound, handleAllOtherErrors } = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");

// start up all the database services
const db = require("./db");
const models = require("./models");
models.init();

// start up the app services
const express = require("express");
const app = express();

// setup morgan
app.use(morganMiddleware);
// parse all incoming data as json
app.use(express.json());

// Setup Swagger when running in dev
if (process.env.NODE_ENV === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerSpec = require('./swagger/swaggerSpec');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

// setup all the routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get("/", (req, res) => {
    res.send("hello world");
});

// Add error handler middleware functions to the pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    Logger.debug(`listening on port: ${port}`);
});