import express from 'express';
import * as aiController from '../controllers/ai.controller.js';

const router = express.Router();

router.get('/generate-result', aiController.result);

export default router;