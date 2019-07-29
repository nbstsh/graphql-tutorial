const Post = {
	author(parent, args, { db }, info) {
		return db.dummyUsers.find(user => user.id === parent.author);
	},
	comments(parent, args, { db }, info) {
		return db.dummyComments.filter(comment => comment.post === parent.id);
	}
};

export default Post;
