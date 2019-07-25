import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    id: ID
    title: String!
    price: Float!
    releaseYear: Int
    isStock: Boolean!
  }
`;

const resolvers = {
	Query: {
		id() {
			return 'randomID';
		},
		title() {
			return 'this is sampole title.';
		},
		price() {
			return 1234.5678;
		},
		releaseYear() {
			return 100;
		},
		isStock() {
			return false;
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => {
	console.log('The server is up!!!');
});
