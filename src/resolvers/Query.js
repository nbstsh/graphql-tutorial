const Query = {
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
};

export default Query;
