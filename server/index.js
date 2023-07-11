

// import {ApolloServer} from '@apollo/server';
// import {startStandaloneServer} from '@apollo/server/standalone';
// import {typeDefs} from './models/typeDefs.js';
// import {resolvers} from './resolvers/resolvers.js';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config({ path: '../.env'})
// const Db = process.env.ATLAS_URI;
// const PORT = process.env.PORT;

// const db = await mongoose.connect(`${Db}`);
// console.info(db ? 'Connected to CookBook DataBase' : 'Not connected toCookBook DataBase' );

// const server = new ApolloServer({typeDefs, resolvers})
// const { url } = await startStandaloneServer(server, {
//   listen: {
//       port: PORT,
//   },
// });
// console.info(`🚀 Server ready at ${url}`);

import {ApolloServer} from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {typeDefs} from './models/typeDefs.js';
import {resolvers} from './resolvers/resolvers.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env'})
const Db = process.env.ATLAS_URI;
const PORT = process.env.PORT;

const app = express();

// const db = mongoose.connect(`${Db}`);
// console.log(db ? 'Connected to CookBook DataBase' : 'Not connected toCookBook DataBase' );

mongoose.connect(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Db connected');
})
.catch(err => {
  console.log(err.message);
});

app.use(cors());

app.use(
  '/recipes',
  cors({
    origin: ['*', 'https://my-cookbook-one.vercel.app/', 'https://vercel.live/link/my-cookbook-server-qtiisk4t6-feulife.vercel.app?via=deployment-domains-list-commit', 'https://my-cookbook-server-1ux59kkwk-feulife.vercel.app', 'https://my-cookbook-server.vercel.app/', 'https://vercel.com/feulife/my-cookbook-one/58yqWdyNyjfAQQzDywV1Tzw7cSJL']    
  }),
  bodyParser.json(),
  expressMiddleware(server)
);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();


await new Promise ((resolve) => server.listen({ port: `${PORT}` }, resolve))

console.info(`🚀 Server ready at http://localhost:${PORT}`);

