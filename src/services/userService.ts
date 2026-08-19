import { User } from '../models/userModel';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../repositories/userRepository';

export const fetchAllUsers = (): User[] => getAllUsers();

export const fetchUserById = (id: string): User | undefined => getUserById(id);

export const modifyUser = (
  id: string,
  updatedData: Partial<User>
): User | undefined => updateUser(id, updatedData);

export const removeUser = (id: string): boolean => deleteUser(id);
