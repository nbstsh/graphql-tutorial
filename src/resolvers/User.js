const User = {
	posts(parent, args, { db }, info) {
		return db.dummyPosts.filter(post => post.author === parent.id);
	},
	comments(parent, args, { db }, info) {
		return db.dummyComments.filter(comment => comment.user === parent.id);
	}
};

export default User;
