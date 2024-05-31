import  express  from 'express';
import { asyncErrorHandler } from '../../Errors/aysncErrorHandler';
import { userLogin, userLogout, userRegister } from '../../controllers/auth/auth.controller';

const authRouter=express.Router();


authRouter.post("/",asyncErrorHandler(userRegister));
authRouter.get("user/login",asyncErrorHandler(userLogin));
authRouter.delete("user/logout",asyncErrorHandler(userLogout));

export default authRouter;