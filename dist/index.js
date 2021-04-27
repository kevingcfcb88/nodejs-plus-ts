"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./src/routes/crmRoutes");
const createMessage_1 = require("./src/controllers/createMessage");
const app = express();
const PORT = 3000;
const connectionString = 'mongodb://dbUser:XRzEvW7w-*YkWjE@ts-node-shard-00-00.7qa43.mongodb.net:27017,ts-node-shard-00-01.7qa43.mongodb.net:27017,ts-node-shard-00-02.7qa43.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pjtc3t-shard-0&authSource=admin&retryWrites=true&w=majority';
// mongoose connection
// pass: XRzEvW7w-*YkWjE
// user: dbUser
mongoose.connect(connectionString, {
    useMongoClient: true
});
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
crmRoutes_1.default(app);
// serving static files
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send(new createMessage_1.default('3000').messagePrint());
});
app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
