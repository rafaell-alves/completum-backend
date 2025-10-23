import express from 'express';
import dotenv from 'dotenv';
import users from './routes/users';
import auth from './routes/auth';
import characters from './routes/characters';
import items from './routes/items';
import monsters from './routes/monsters';
import builds from './routes/builds';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

const port = process.env.APP_PORT;
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'authorization'],
};
const app = express();
app.use(cors(corsOptions));
app.use(
  '/users',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  users,
);

app.use(
  '/auth',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  auth,
);

app.use(
  '/character',
  // bodyParser.json(),
  // bodyParser.urlencoded({ extended: true }),
  characters,
);

app.use(
  '/items',
  // bodyParser.json(),
  // bodyParser.urlencoded({ extended: true }),
  items,
);

app.use(
  '/monster',
  // bodyParser.json(),
  // bodyParser.urlencoded({ extended: true }),
  monsters,
);
app.use(
  '/builds',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  builds,
);

app.listen(port, () => {
  console.log('Está rodando na porta' + port);
});
