import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import typeDefs from './db/schema.js';
import resolvers from './db/resolvers.js';
import connectDB from './config/db.js';

dotenv.config();

// Connect to database
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization'] || '';
    if (token) {
      try {
        const user = jwt.verify(
          token.replace('Bearer ', ''),
          process.env.SECRET_WORD
        );
        return { user };
      } catch (error) {
        console.log('Token verification error:', error);
      }
    }
    return {};
  },
});

// Start server in standalone mode
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀 Server ready at ${url}`);
