import {combineReducers} from 'redux';
import Constants from '../constants';

const DEFAULT_SUBREDDIT = 'aww';

function selectedSubReddit(state = DEFAULT_SUBREDDIT, action) {
	switch (action.type) {
		case Constants.SUBREDDIT_SELECTED:
			return action.subreddit;
		default:
			return state;
	}
}

function posts(state = {
	isFetching: false,
	didRefresh: false,
	items: [],
	after: ""
}, action) {
	switch (action.type) {
		case Constants.SUBREDDIT_REFRESHED:
			return Object.assign({}, state, {
				didRefresh: true
			});
		case Constants.POSTS_REQUESTING:
			return Object.assign({}, state, {
				isFetching: true,
				didRefresh: false,
			});
		case Constants.POSTS_RECEIVED:
			return Object.assign({}, state, {
				didRefresh: true,
				isFetching: false,
				items: state.items.concat(action.posts),
				after: action.after
			});
		default:
			return state;
	}
}

function postsBySubReddit(state = {}, action) {
	switch (action.type) {
		case Constants.SUBREDDIT_REFRESHED:
		case Constants.POSTS_RECEIVED:
		case Constants.POSTS_REQUESTING:
			return Object.assign({}, state, {
				[action.subreddit]: posts(state[action.subreddit], action)
			})
			default:
			return state;
	}
}

function comments(state = {
	isFetching: false,
	items: [],
	after: ""
}, action) {
	switch (action.type) {
		case Constants.COMMENTS_REQUESTING:
			return Object.assign({}, state, {
				isFetching: true
			});
		case Constants.COMMENTS_RECEIVED:
			return Object.assign({}, state, {
				isFetching: false,
				items: state.items,
				after: action.after
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	selectedSubReddit,
	postsBySubReddit,
	comments
});

export default rootReducer;
