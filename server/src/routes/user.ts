import express, { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user';
import { auth, adminOnly } from '../middlewares/auth';

const router: Router = express.Router();

// Get all users (admin only)
router.get('/', auth as any, adminOnly as any, getAllUsers as any);

// Get user by ID
router.get('/:id', auth as any, getUserById as any);

// Update user
router.put('/:id', auth as any, updateUser as any);

// Delete user (admin only)
router.delete('/:id', auth as any, adminOnly as any, deleteUser as any);

export default router; 