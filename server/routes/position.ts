import express, {Router} from "express"
import PositionController from "../controllers/position"

const positionRouter = Router();

const positionController = PositionController;

positionRouter.post('/positions', positionController.newPosition)

positionRouter.get('/positions', positionController.getAllPositions)


positionRouter.get('/positions/:id', positionController.getOnePosition)

module.exports = positionRouter;