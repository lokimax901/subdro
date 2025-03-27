import express, { Router } from 'express';
import { register, login } from '../controllers/auth';

const router: Router = express.Router();

// Register a new user
router.post('/register', register as any);

// Login user
router.post('/login', login as any);

export default router; 