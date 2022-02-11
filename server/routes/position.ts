import express, {Router} from "express"
import PositionController from "../controllers/position"

const positionRouter = Router();

const positionController = PositionController;

positionRouter.post('/positions', positionController.newPosition)

positionRouter.get('/positions', positionController.getAllPositions)


positionRouter.get('/positions/:id', positionController.getPositionById)

positionRouter.put('/positions/:id', positionController.updatePositionById)

positionRouter.delete('/positions/:id', positionController.deletePositionById)

module.exports = positionRouter;