import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    id: ID
    title: String!
    price: Float!
    releaseYear: Int
    isStock: Boolean!
    drink: Drink!
    greeting(name: String): String!
  }

  type Drink {
    id: ID!
    name: String!
    price: Int! 
    size: String!
    isStock: Boolean!
    rating: Float!
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
		},
		drink() {
			return {
				id: '1234',
				name: 'Iced Coffee',
				price: 356,
				size: 'Tall',
				isStock: true,
				rating: 4.82
			};
		},
		greeting(parent, args, ctx, info) {
			if (args.name) {
				return `Hello ${args.name}`;
			} else {
				return 'Hello Someone!!!!';
			}
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
