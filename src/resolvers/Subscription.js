const Subscription = {
	count: {
		subscribe(parent, args, { pubsub }, info) {
			let count = 0;

			setInterval(() => {
				count++;
				pubsub.publish('count', {
					count
				});
			}, 1000);

			return pubsub.asyncIterator('count');
		}
	},
	comment: {
		subscribe(parent, { postId }, { db, pubsub }, info) {
			const { dummyPosts } = db;
			const post = dummyPosts.find(post => post.id === postId);
			if (!post) throw new Error('Post with given id was not found!');

			return pubsub.asyncIterator(`comment ${post.id}`); // Channel name is `comment ${post.id}`
		}
	}
};

export default Subscription;
