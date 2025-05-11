import request from 'supertest';
import { server } from '../app'; // Ensure your app exports the server instance

describe('API Tests', () => {
  let createdUserId: string;

  afterAll(() => {
    server.close();
  });

  it('should return an empty array for GET /api/users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new user with POST /api/users', async () => {
    const newUser = { username: 'John Doe', age: 30, hobbies: ['reading'] };
    const response = await request(server).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
    expect(response.body.id).toBeDefined();
    createdUserId = response.body.id; // Save the ID for later tests
  });

  it('should fetch the created user by ID with GET /api/users/:id', async () => {
    const response = await request(server).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUserId);
    expect(response.body.username).toBe('John Doe');
  });

  it('should update the created user with PUT /api/users/:id', async () => {
    const updatedData = { username: 'Jane Doe', age: 35 };
    const response = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUserId);
    expect(response.body.username).toBe('Jane Doe');
    expect(response.body.age).toBe(35);
  });

  it('should delete the created user with DELETE /api/users/:id', async () => {
    const response = await request(server).delete(
      `/api/users/${createdUserId}`
    );
    expect(response.status).toBe(204);
  });

  it('should return 404 for GET /api/users/:id after deletion', async () => {
    const response = await request(server).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
