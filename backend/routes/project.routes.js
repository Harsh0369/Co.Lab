import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create',
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
)

export default router;