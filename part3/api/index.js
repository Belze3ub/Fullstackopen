const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(express.json());

morgan.token('body', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});

app.use(morgan(':method :url :response-time ms :body'));

app.use(cors())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  const person = persons.find((person) => person.id === personId);
  if (person) response.json(person);
  else response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  persons = persons.filter((person) => person.id !== personId);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const maxId = Math.floor(Math.random() * (10000 - 1) + 1);
  const newId = maxId > 0 ? maxId + 1 : 0;
  const exists = persons.map((person) => person.name).includes(body.name);

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is required',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'Number is required',
    });
  } else if (exists) {
    return response.status(401).json({
      error: 'Name is already in a phonebook',
    });
  }
  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number,
  };
  persons = [...persons, newPerson];
  response.json(newPerson);
});

app.get('/info', (request, response) => {
  const now = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${now}</p>`
  );
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}...`);
});

module.exports = app;