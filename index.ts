import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import messenger from './src/controllers/createMessage';
import {Settings} from './settings';

const app = express();
const PORT:number = Settings.PORT;
const connectionString:string = 'mongodb://dbUser:XRzEvW7w-*YkWjE@ts-node-shard-00-00.7qa43.mongodb.net:27017,ts-node-shard-00-01.7qa43.mongodb.net:27017,ts-node-shard-00-02.7qa43.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pjtc3t-shard-0&authSource=admin&retryWrites=true&w=majority';

// mongoose connection
// pass: XRzEvW7w-*YkWjE
// user: dbUser
mongoose.connect( connectionString, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(new messenger(Settings.PORT).messagePrint());
});
    

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);