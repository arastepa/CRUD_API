import http, { IncomingMessage, ServerResponse } from 'http';
import {
  getUsers,
  getUser,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from './controllers/userController';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || '';
    const method = req.method || '';

    if (url === '/api/users' && method === 'GET') {
      getUsers(req, res);
    } else if (url.startsWith('/api/users/') && method === 'GET') {
      const userId = url.split('/')[3];
      getUser(req, res, userId);
    } else if (url === '/api/users' && method === 'POST') {
      createUserHandler(req, res);
    } else if (url.startsWith('/api/users/') && method === 'PUT') {
      const userId = url.split('/')[3];
      updateUserHandler(req, res, userId);
    } else if (url.startsWith('/api/users/') && method === 'DELETE') {
      const userId = url.split('/')[3];
      deleteUserHandler(req, res, userId);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
