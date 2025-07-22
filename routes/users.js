import { Router } from 'express';
import { validateUserRegistration } from '../middleware/validation.js';
const router = Router();
import { verifyJWT } from '../middleware/verifyJWT.js';
import { deleteController, getAllUsersController, loginController, logoutController, refreshTokenController, registerController, updateController } from '../controllers/user.controllers.js';


//Get all users

router.get("/", verifyJWT, getAllUsersController);

//signup

router.post('/register', validateUserRegistration, registerController);

//login 
router.post('/login',validateUserRegistration, loginController);

//update user
router.put("/:id", validateUserRegistration, verifyJWT, updateController);

//delete user

router.delete("/:id",verifyJWT, deleteController)

//refresh

router.get("/refresh", refreshTokenController);

//logout
router.get("/logout", logoutController);

export default router