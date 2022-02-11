import express, {Request, Response, NextFunction} from 'express'
const pool =  require("../database/queries")


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


export default {newPosition, getAllPositions};

// get all positions
// app.get('/positions', async (req: Request, res: Response) => {
//   try {
//       const allPositions = await pool.query('SELECT * FROM positions');
//       res.json(allPositions.rows);
//   } catch (err: any) {
//       console.error(err.message);
//   }
// });

