import  express  from 'express';
import { asyncErrorHandler } from '../../Errors/aysncErrorHandler';
import { isUserAuthenticated } from '../../middlewares/isUserAuthenticated';
import { createAlert } from '../../controllers/alert/alert.controller';

const alertRouter=express.Router();


alertRouter.post("/",asyncErrorHandler(isUserAuthenticated),asyncErrorHandler(createAlert));

export default alertRouter;