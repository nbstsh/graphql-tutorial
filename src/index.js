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
    posts: [Post!]!
    post(id: ID!): Post
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
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String
    published: Boolean!
    author: User!
  }
  
`;

const dummyUsers = [
	{
		id: 1,
		name: 'Takeshi',
		age: 18
	},
	{
		id: 2,
		name: 'Haruka'
	},
	{
		id: 3,
		name: 'KOUSUKE',
		age: 47
	}
];

const dummyPosts = [
	{
		id: 'post1',
		title: 'This is sample post 1!',
		body: 'Hello world!!!',
		published: true,
		author: 1
	},
	{
		id: 'post2',
		title: 'This is sample post 2!',
		body: 'Hello world!!!',
		published: true,
		author: 1
	},
	{
		id: 'post3',
		title: 'This is sample post 3!',
		body: 'Hello world!!!',
		published: false,
		author: 2
	}
];

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
			return dummyUsers;
		},
		posts() {
			return dummyPosts;
		},
		post(parent, args, ctx, info) {
			return dummyPosts.find(post => post.id === args.id);
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return dummyUsers.find(user => user.id === parent.author);
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
