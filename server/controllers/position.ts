import express, {Request, Response, NextFunction} from 'express'
const pool =  require("../database/queries")
import bodyParser from 'body-parser';



// create new position
const newPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { symbol, company_name, cost_basis, current_price, quantity  } = req.body;
    //$1 allows variables to be added to db?
    const newPosition = await pool.query('INSERT INTO positions (symbol, company_name, cost_basis, current_price, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *', [symbol, company_name, cost_basis, current_price, quantity]);
    res.json(newPosition.rows[0]);
  } catch (err: any) {
      console.error(err.message);
  }
}

// get all positions
const getAllPositions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPositions = await pool.query('SELECT * FROM positions');
    res.json(allPositions.rows);
  } catch (err: any) {
      console.error(err.message);
  }
}

//get position by ID
const getOnePosition = async (req: Request, res: Response, next: NextFunction) => {
    const id  = parseInt(req.params.id);
  
    pool.query('SELECT * FROM positions WHERE position_id = $1', [id], (err: any, results: any) => {
      if (err) {
        throw err
      }
      res.status(200).json(results.rows)
    })  
}

export default {newPosition, getAllPositions, getOnePosition};

// app.get('/positions/:id', async (req: Request, res: Response) => {
//   try {
//       //console.log(req.params) ==> logs the params (:id)
//       const { id } = req.params;

//       const position = await pool.query('SELECT * FROM positions WHERE position_id  = $1', [id]);
//       res.json(position.rows[0]);
//   } catch (err: any) {
//       console.error(err.message);
//   }
// });

