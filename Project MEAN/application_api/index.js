const express = require('express');
const dotenv = require("dotenv");
var mongoClient = require('mongoose');

const port = 8080;

const cors = require('cors');

const app = express();

dotenv.config();

mongoClient.connect(process.env.DB_CONNECTION_STRING, { dbName: process.env.DB_NAME });

app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200"
}))

const listingRoutes = require("./routes/listingRoutes");
app.use("/api/listing", listingRoutes);
const questionRoutes = require("./routes/questionRoutes");
app.use("/api/question", questionRoutes);

app.listen(port, () => { console.log("App is running on port: " + port) });

