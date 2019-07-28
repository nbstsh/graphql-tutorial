import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

//////////////////////////////////////////// dummy data
const dummyUsers = [
	{
		id: '1',
		name: 'Takeshi',
		age: 18,
		email: 'takeshi@gmail.com',
		posts: ['post1', 'post2'],
		comments: ['comment1', 'comment3']
	},
	{
		id: '2',
		name: 'Haruka',
		email: 'haruka@gmail.com',
		posts: ['post3'],
		comments: ['comment2']
	},
	{
		id: '3',
		name: 'KOUSUKE',
		age: 47,
		email: 'KOUSUKE@gmail.com',
		posts: [],
		comments: []
	}
];

const dummyPosts = [
	{
		id: 'post1',
		title: 'This is sample post 1!',
		body: 'Hello world!!!',
		published: true,
		author: '1',
		comments: ['comment1', 'comment2']
	},
	{
		id: 'post2',
		title: 'This is sample post 2!',
		body: 'Hello world!!!',
		published: true,
		author: '1',
		comments: ['comment3']
	},
	{
		id: 'post3',
		title: 'This is sample post 3!',
		body: 'Hello world!!!',
		published: false,
		author: '2',
		comments: []
	}
];

const dummyComments = [
	{
		id: 'comment1',
		user: '1',
		post: 'post1',
		text: 'Sample Comment !!!!!',
		createdAt: '2019-07-29T12:07:55.146Z'
	},
	{
		id: 'comment2',
		user: '2',
		post: 'post1',
		text: 'Sample Comment !!!!!',
		createdAt: '2019-07-25T12:07:55.146Z'
	},
	{
		id: 'comment3',
		user: '1',
		post: 'post2',
		text: 'Sample Comment !!!!!',
		createdAt: '2019-07-23T12:07:55.146Z'
	}
];

const deletePost = id => {
	const index = dummyPosts.findIndex(post => post.id === id);
	if (index === -1) return;

	// delete post
	const deletedPost = dummyPosts.splice(index, 1)[0];

	// delete comments which belong to the post
	deletedPost.comments.forEach(deleteComment);

	return deletedPost;
};

const deleteComment = id => {
	const index = dummyComments.findIndex(comment => comment.id === id);
	if (index === -1) return;

	return dummyComments.splice(index, 1)[0];
};

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
	},

	Mutation: {
		createUser(parent, { data }, ctx, info) {
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
		createPost(parent, { data }, ctx, info) {
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
		deleteUser(parent, { id }, ctx, info) {
			const index = dummyUsers.findIndex(user => user.id === id);
			if (index === -1) throw new Error('User with given id not found!');

			// delete user from the dummy array
			const deletedUser = dummyUsers.splice(index, 1)[0];

			const { posts, comments } = deletedUser;

			posts.forEach(deletePost);
			comments.forEach(deleteComment);

			return deletedUser;
		},
		deletePost(parent, { id }, ctx, info) {
			const postExists = dummyPosts.some(post => post.id === id);
			if (!postExists)
				throw new Error('Post with given Id was not found!');

			return deletePost(id);
		},
		deleteComment(parent, { id }, ctx, info) {
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
	resolvers
});

server.start(() => {
	console.log('The server is up!!!');
});
