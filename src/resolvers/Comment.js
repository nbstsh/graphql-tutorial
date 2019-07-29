const Comment = {
	user(parent, args, { db }, info) {
		return db.dummyUsers.find(user => user.id === parent.user);
	},
	post(parent, args, { db }, info) {
		return db.dummyPosts.find(post => post.id === parent.post);
	}
};

export default Comment;
