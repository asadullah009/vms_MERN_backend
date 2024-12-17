
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db/mongodb");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger"); 
const path = require("path");

// Load environment variables
dotenv.config();

const allRoutes = require("./routes/routes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = app.listen(process.env.PORT, () => {
    console.log(`*********************************************`);
    console.log('***********                        **********');
    console.log(`*********** Running On Port: ${process.env.PORT} ***********`);
    console.log('***********                        **********');
    console.log(`*********************************************`);

});

// Routes
app.use("/api/v1", allRoutes);

module.exports = app;
