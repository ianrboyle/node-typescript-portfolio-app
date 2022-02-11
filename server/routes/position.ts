import express, {Router} from "express"
import PositionController from "../controllers/position"

const positionRouter = Router();

const positionController = PositionController;

positionRouter.post('/positions', positionController.newPosition)

positionRouter.get('/positions', positionController.getAllPositions)

module.exports = positionRouter;