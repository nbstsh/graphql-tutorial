import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import * as db from './db';

////////////////////////////////////////////// typeDefs
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
	
	type Mutation {
		createUser(data: CreateUserInput!): User!
		createPost(data: CreatePostInput!): Post!
		deleteUser(id: ID!): User!
		deletePost(id: ID!): Post!
		deleteComment(id: ID!): Comment!
	}

	input CreateUserInput {
		name: String!
		email: String!
		age: Int
	}

	input CreatePostInput {
		title: String!
		body: String
		published: Boolean!
		author: ID!
	}
	
	
`;

////////////////////////////////////////////// resolvers
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
		users(parent, args, { db }, info) {
			return db.dummyUsers;
		},
		posts(parent, args, { db }, info) {
			return db.dummyPosts;
		},
		post(parent, args, { db }, info) {
			return db.dummyPosts.find(post => post.id === args.id);
		},
		comments(parent, args, { db }, info) {
			return db.dummyComments;
		},
		comment(parent, args, { db }, info) {
			return db.dummyComments.find(comment => comment.id === args.id);
		}
	},
	Post: {
		author(parent, args, { db }, info) {
			return db.dummyUsers.find(user => user.id === parent.author);
		},
		comments(parent, args, { db }, info) {
			return db.dummyComments.filter(
				comment => comment.post === parent.id
			);
		}
	},
	User: {
		posts(parent, args, { db }, info) {
			return db.dummyPosts.filter(post => post.author === parent.id);
		},
		comments(parent, args, { db }, info) {
			return db.dummyComments.filter(
				comment => comment.user === parent.id
			);
		}
	},
	Comment: {
		user(parent, args, { db }, info) {
			return db.dummyUsers.find(user => user.id === parent.user);
		},
		post(parent, args, { db }, info) {
			return db.dummyPosts.find(post => post.id === parent.post);
		}
	},

	Mutation: {
		createUser(parent, { data }, { db }, info) {
			const { dummyUsers } = db;
			const isEmailTaken = dummyUsers.some(
				user => user.email === data.email
			);
			if (isEmailTaken) throw new Error('The email is already taken!');

			const user = {
				id: uuidv4(),
				...data,
				posts: [],
				comments: []
			};

			dummyUsers.push(user);

			return user;
		},
		createPost(parent, { data }, { db }, info) {
			const { dummyUsers, dummyPosts } = db;

			const user = dummyUsers.find(user => user.id === data.author);
			if (!user) throw new Error('User not exists!');

			const post = {
				id: uuidv4(),
				...data,
				comments: []
			};

			dummyPosts.push(post);

			user.posts.push(data.author);

			return post;
		},
		deleteUser(parent, { id }, { db }, info) {
			const { dummyUsers, deletePost, deleteComment } = db;

			const index = dummyUsers.findIndex(user => user.id === id);
			if (index === -1) throw new Error('User with given id not found!');

			// delete user from the dummy array
			const deletedUser = dummyUsers.splice(index, 1)[0];

			const { posts, comments } = deletedUser;

			posts.forEach(deletePost);
			comments.forEach(deleteComment);

			return deletedUser;
		},
		deletePost(parent, { id }, { db }, info) {
			const { dummyPosts, deletePost } = db;

			const postExists = dummyPosts.some(post => post.id === id);
			if (!postExists)
				throw new Error('Post with given Id was not found!');

			return deletePost(id);
		},
		deleteComment(parent, { id }, { db }, info) {
			const { dummyComments, deleteComment } = db;

			const commentExists = dummyComments.some(
				comment => comment.id === id
			);
			if (!commentExists)
				throw new Error('Comment with given id was not found!');

			return deleteComment(id);
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: {
		db
	}
});

server.start(() => {
	console.log('The server is up!!!');
});
