import { IncomingMessage, ServerResponse } from 'http';
import {
  fetchAllUsers,
  fetchUserById,
  modifyUser,
  removeUser,
} from '../services/userService';
import { createUser } from '../models/userModel';

interface RequestBody {
  username?: string;
  age?: number;
  hobbies?: string[];
}

const parseRequestBody = (req: IncomingMessage): Promise<RequestBody> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const getUsers = (req: IncomingMessage, res: ServerResponse): void => {
  const users = fetchAllUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUser = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
): void => {
  const user = fetchUserById(userId);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const createUserHandler = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const { username, age, hobbies } = await parseRequestBody(req);

    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid request body' }));
      return;
    }

    const newUser = createUser(username, age, hobbies);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid JSON format' }));
  }
};

export const updateUserHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
): Promise<void> => {
  try {
    const updatedData = await parseRequestBody(req);

    const updatedUser = modifyUser(userId, updatedData);

    if (!updatedUser) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedUser));
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid JSON format' }));
  }
};

export const deleteUserHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
): void => {
  if (!removeUser(userId)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(204);
  res.end();
};
