import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';

const router = Router();


router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    userController.createUserController
)

router.post('/login',
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:5}).withMessage('Password is required'),
    userController.loginController);


export default router;