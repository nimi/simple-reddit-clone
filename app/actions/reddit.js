import Constants from '../constants';
import {getSubRedditUrl, getCommentUrl} from '../utils';

const Actions = {

	selectSubReddit: subreddit => ({
		type: Constants.SUBREDDIT_SELECTED,
		subreddit
	}),

	refreshSubReddit: subreddit => ({
		type: Constants.SUBREDDIT_REFRESHED,
		subreddit
	}),

	requestPosts: (subreddit, after) => ({
		type: Constants.POSTS_REQUESTING,
		subreddit,
		after
	}),

	receivePosts: (subreddit, json) => ({
		type: Constants.POSTS_RECEIVED,
		subreddit,
		posts: json.data.children.map(child => child.data),
		after: json.data.after
	}),

	requestComments: (postId, after) => ({
		type: Constants.COMMENTS_REQUESTING,
		postId,
		after
	}),

	receiveComments: (postId, json) => ({
		type: Constants.COMMENTS_RECEIVED,
		postId,
		items: json.data.children.map(child => child.data),
		after: json.data.after
	}),

	fetchPosts: (subreddit, after) => dispatch => {
		dispatch(Actions.requestPosts(subreddit, after));
		return fetch(getSubRedditUrl(subreddit, after))
			.then(response => response.json())
			.then(json => dispatch(Actions.receivePosts(subreddit, json)));
	},

	fetchPostsIfNeeded: (subreddit, after) => {
		return (dispatch, getState) => {
			const state = getState();
			if (shouldFetchPosts(state, subreddit)) {
				return dispatch(Actions.fetchPosts(subreddit, after))
			}
		}
	},

	fetchComments: (postId, after) => dispatch => {
		dispatch(Actions.requestComments(postId, after));
		return fetch(getCommentUrl(postId, after))
			.then(response => response.json())
			.then(json => dispatch(Actions.receiveComments(postId, json[0])))
	}
};

export default Actions;

function shouldFetchPosts(state, subreddit) {
	const posts = state.postsBySubReddit[subreddit];
	if (!posts) {
		return true;
	} else if (posts.isFetching) {
		return false;
	} else {
		return posts.didRefresh;
	}
}
