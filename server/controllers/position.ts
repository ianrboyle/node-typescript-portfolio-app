import express, {Request, Response, NextFunction} from 'express'
import getPositionInfo from "../services/yahoo"
const pool =  require("../database/queries")


// create new position
const newPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { symbol, cost_basis, quantity } = req.body;
    const positionInfo = await getPositionInfo(symbol)

    const currentPrice: number = positionInfo[0]
    const companyName = positionInfo[1]
    //$1 allows variables to be added to db?
    const newPosition = await pool.query('INSERT INTO positions (symbol, company_name, cost_basis, current_price, quantity, current_value) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [symbol, companyName, cost_basis, currentPrice, quantity, (currentPrice * quantity)]);


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
    console.log("MY_VARIABLE: " + process.env.YAHOO_API_KEY);
  } catch (err: any) {
      console.error(err.message);
  }
}

//get position by ID
const getPositionById = async (req: Request, res: Response, next: NextFunction) => {
      try { 
      const { id } = req.params;
      const position = await pool.query('SELECT * FROM positions WHERE position_id  = $1', [id]);
      console.log(req.params) 
      res.json(position.rows[0]);
  } catch (err: any) {
      console.error(err.message);
  }
}

const updatePositionById =  async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { cost_basis, current_price, quantity  } = req.body;
        const updatePosition = await pool.query('UPDATE positions SET quantity = $1, cost_basis = $2, current_price = $3, current_value = $4 WHERE position_id = $5', [quantity, cost_basis, current_price, (current_price * quantity), id]);
        res.json('Position updated');
    } catch (err: any) {
        console.error(err.message);
    }
  }
const deletePositionById = async (req: Request, res: Response, next: NextFunction) => {
  try { 
  const { id } = req.params;
  const deletePosition = await pool.query('DELETE FROM positions WHERE position_id = $1', [id])
  res.json('Position deleted');
} catch (err: any) {
  console.error(err.message);
}
}
export default {newPosition, getAllPositions, getPositionById, deletePositionById, updatePositionById};

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

