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
    grades: [Int!]!
    users: [User!]!
  }

  type Drink {
    id: ID!
    name: String!
    price: Int! 
    size: String!
    isStock: Boolean!
    rating: Float!
  }
  
  type User {
    id: ID!
    name: String!
    age: Int
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
		},
		grades() {
			return [90, 10, 38, 100, 11];
		},
		users() {
			const user1 = {
				id: 1,
				name: 'Takeshi',
				age: 18
			};
			const user2 = {
				id: 2,
				name: 'Haruka'
			};
			const user3 = {
				id: 3,
				name: 'KOUSUKE',
				age: 47
			};

			return [user1, user2, user3];
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
