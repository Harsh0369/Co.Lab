import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import { body } from 'express-validator';

const router = Router();


router.post('/register',
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isLength({ min: 5 }).withMessage("Password is required"),
    userController.createUserController
)

router.post('/login',
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:5}).withMessage('Password is required'),
    userController.loginController);

router.get('/profile', authMiddleware.authUSer, userController.profileController);

router.get('/logout', authMiddleware.authUSer, userController.logoutController);


export default router;