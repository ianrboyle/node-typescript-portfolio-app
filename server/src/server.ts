import express, {Application, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

const app: Application = express();
const pool =  require("../database/queries")
const routes = require('../routes/position')
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});
app.use('/', routes);




app.listen(5000, () => console.log("Listening on port 5000"))