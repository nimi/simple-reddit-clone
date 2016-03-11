export function getSubRedditUrl(subreddit, after) {
	return `http://www.reddit.com/r/${subreddit}.json?after=${after}`;
}

export function getCommentUrl(postId, after) {
	return `http://www.reddit.com/comments/${postId}.json?after=${after}`;
}

export function isValidThumbnail(str = DEFAULT_THUMBNAIL) {
	return (str !== 'nsfw' && str !== 'self' && str !== 'default' && str !== '');
}

const SUBREDDITS = [
	{name: 'javascript'},
	{name: 'reactjs'},
	{name: 'aww'},
	{name: 'worldnews'},
	{name: 'food'},
	{name: 'todayilearned'},
	{name: 'movies'},
	{name: 'ama'},
	{name: 'science'},
	{name: 'iosdev'},
	{name: 'androiddev'}
];

export function getSubReddits() {
	return SUBREDDITS;
}
