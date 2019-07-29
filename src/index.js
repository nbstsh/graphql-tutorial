import { GraphQLServer } from 'graphql-yoga';

import Query from './resolvers/Query';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Comment from './resolvers/Comment';
import Mutation from './resolvers/Mutation';

import * as db from './db';

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		Query,
		Post,
		User,
		Comment,
		Mutation
	},
	context: {
		db
	}
});

server.start(() => {
	console.log('The server is up!!!');
});
