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
    comments: [Comment!]!
    comment(id: ID!): Comment
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
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    user: User!
    post: Post!
    text: String!
    createdAt: String! 
  }
  
`;

const dummyUsers = [
	{
		id: 1,
		name: 'Takeshi',
		age: 18,
		email: 'takeshi@gmail.com'
	},
	{
		id: 2,
		name: 'Haruka',
		email: 'haruka@gmail.com'
	},
	{
		id: 3,
		name: 'KOUSUKE',
		age: 47,
		email: 'KOUSUKE@gmail.com'
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

const dummyComments = [
	{
		id: 'comment1',
		user: 1,
		post: 'post1',
		text: 'Sample Comment !!!!!',
		createdAt: '2019-07-29T12:07:55.146Z'
	},
	{
		id: 'comment2',
		user: 2,
		post: 'post1',
		text: 'Sample Comment !!!!!',
		createdAt: '2019-07-25T12:07:55.146Z'
	},
	{
		id: 'comment3',
		user: 1,
		post: 'post2',
		text: 'Sample Comment !!!!!',
		createdAt: '2019-07-23T12:07:55.146Z'
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
		},
		comments() {
			return dummyComments;
		},
		comment(parent, args, ctx, info) {
			return dummyComments.find(comment => comment.id === args.id);
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return dummyUsers.find(user => user.id === parent.author);
		},
		comments(parent, args, ctx, info) {
			return dummyComments.filter(comment => comment.post === parent.id);
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			return dummyPosts.filter(post => post.author === parent.id);
		},
		comments(parent, args, ctx, info) {
			return dummyComments.filter(comment => comment.user === parent.id);
		}
	},
	Comment: {
		user(parent, args, ctx, info) {
			return dummyUsers.find(user => user.id === parent.user);
		},
		post(parent, args, ctx, info) {
			return dummyPosts.find(post => post.id === parent.post);
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
