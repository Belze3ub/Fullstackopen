const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { usersInDb } = require('./testHelper');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('user without username is not added', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: '',
      name: 'Tom',
      password: 'Tomm',
    };

    await api.post('/api/users').send(newUser).expect(400);
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('user without password is not added', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'Tom',
      name: 'Tom',
      password: '',
    };

    await api.post('/api/users').send(newUser).expect(400);
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('user with username shorter than 3 character is not added', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'To',
      name: 'Tom',
      password: 'Tom',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(result.body.error).toContain(
      'Username must be at least 3 characters long'
    );
  });

    test('user with password shorter than 3 character is not added', async () => {
      const usersAtStart = await usersInDb();

      const newUser = {
        username: 'Tom',
        name: 'Tom',
        password: 'To',
      };

      const result = await api.post('/api/users').send(newUser).expect(400);
      const usersAtEnd = await usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
      expect(result.body.error).toContain(
        'Password must be at least 3 characters long'
      );
    });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
