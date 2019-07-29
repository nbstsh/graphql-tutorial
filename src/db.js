//////////////////////////////////////////// dummy data
export const dummyUsers = [
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

export const dummyPosts = [
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

export const dummyComments = [
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

export const deletePost = id => {
	const index = dummyPosts.findIndex(post => post.id === id);
	if (index === -1) return;

	// delete post
	const deletedPost = dummyPosts.splice(index, 1)[0];

	// delete comments which belong to the post
	deletedPost.comments.forEach(deleteComment);

	return deletedPost;
};

export const deleteComment = id => {
	const index = dummyComments.findIndex(comment => comment.id === id);
	if (index === -1) return;

	return dummyComments.splice(index, 1)[0];
};
