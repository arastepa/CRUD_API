import { User, users } from '../models/userModel';

export const getAllUsers = (): User[] => users;

export const getUserById = (id: string): User | undefined =>
  users.find((user) => user.id === id);

export const updateUser = (
  id: string,
  updatedData: Partial<User>
): User | undefined => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return undefined;

  users[userIndex] = { ...users[userIndex], ...updatedData };
  return users[userIndex];
};

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  return true;
};
