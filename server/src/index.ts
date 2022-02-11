import express, {Application, Request, Response, NextFunction} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
const app: Application = express();
const pool =  require("../database/queries")

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


//ROUTES 
// create position
app.post('/positions', async (req: Request, res: Response) => {
  try {
      const { symbol, company_name, cost_basis, current_price, quantity  } = req.body;
      //$1 allows variables to be added to db?
      const newPosition = await pool.query('INSERT INTO positions (symbol, company_name, cost_basis, current_price, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *', [symbol, company_name, cost_basis, current_price, quantity]);
      res.json(newPosition.rows[0]);
  } catch (err: any) {
      console.error(err.message);
  }
});

// get all positions
app.get('/positions', async (req: Request, res: Response) => {
  try {
      const allPositions = await pool.query('SELECT * FROM positions');
      res.json(allPositions.rows);
  } catch (err: any) {
      console.error(err.message);
  }
});


//get position by ID
app.get('/positions/:id', async (req: Request, res: Response) => {
  try {
      //console.log(req.params) ==> logs the params (:id)
      const { id } = req.params;

      const position = await pool.query('SELECT * FROM positions WHERE position_id  = $1', [id]);
      res.json(position.rows[0]);
  } catch (err: any) {
      console.error(err.message);
  }
});

app.put('/positions/:id', async (req: Request, res: Response) => {
  try {
      //console.log(req.params) ==> logs the params (:id)
      const { id } = req.params;
      const { cost_basis, current_price, quantity  } = req.body;
      const updatePosition = await pool.query('UPDATE positions SET quantity = $1, cost_basis = $2, current_price = $3 WHERE position_id = $4', [quantity, cost_basis, current_price, id]);
      res.json('Position updated');
  } catch (err: any) {
      console.error(err.message);
  }
})

app.delete('/positions/:id', async (req: Request, res: Response) => {
  try {
      //console.log(req.params) ==> logs the params (:id)
      const { id } = req.params;
      const deletePosition = await pool.query('DELETE FROM positions WHERE position_id = $1', [id])
      res.json('Position deleted');
  } catch (err: any) {
      console.error(err.message);
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
});

app.listen(5000, () => console.log("Listening on port 5000"))