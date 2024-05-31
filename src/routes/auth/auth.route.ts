import  express  from 'express';
import { asyncErrorHandler } from '../../Errors/aysncErrorHandler';
import { userRegister } from '../../controllers/auth/auth.controller';

const authRouter=express.Router();


authRouter.get("/",asyncErrorHandler(userRegister))

export default authRouter;