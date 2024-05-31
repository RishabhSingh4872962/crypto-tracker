import  express  from 'express';
import { asyncErrorHandler } from '../../Errors/aysncErrorHandler';
import { userLogin, userLogout, userRegister } from '../../controllers/auth/auth.controller';
import { isUserAuthenticated } from '../../middlewares/isUserAuthenticated';

const authRouter=express.Router();


authRouter.post("/register",asyncErrorHandler(userRegister));
authRouter.get("/login",asyncErrorHandler(userLogin));
authRouter.delete("/logout",asyncErrorHandler(isUserAuthenticated),asyncErrorHandler(userLogout));

export default authRouter;