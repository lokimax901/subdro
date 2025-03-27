import { Request, Response } from 'express';
import { supabase } from '../index';
import { AuthRequest, UpdateUserRequest } from '../types';

// Get all users (admin only)
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, role, created_at, subscription_status, subscription_type, subscription_end_date');

    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    
    // Check if user is admin or getting their own info
    if (req.user?.role !== 'admin' && req.user?.id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, role, created_at, subscription_status, subscription_type, subscription_end_date')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
export const updateUser = async (req: Request<{id: string}, {}, UpdateUserRequest>, res: Response) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    
    // Check if user is admin or updating their own info
    if ((req as AuthRequest).user?.role !== 'admin' && (req as AuthRequest).user?.id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Regular users can't update subscription details
    if ((req as AuthRequest).user?.role !== 'admin') {
      delete updates.subscription_status;
      delete updates.subscription_type;
      delete updates.subscription_end_date;
    }

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select('id, email, first_name, last_name, role, created_at, subscription_status, subscription_type, subscription_end_date')
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user (admin only)
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 