import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create',authMiddleware.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
)

export default router;