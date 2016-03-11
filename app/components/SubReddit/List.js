'use strict'

import React, {
	Component,
	ListView,
	Text,
	View
} from 'react-native';

import {connect} from 'react-redux';

import SubRedditItem from './Item';
import {getSubReddits} from '../../utils';
import RedditActions from '../../actions/reddit'

const {selectSubReddit, fetchPostsIfNeeded, refreshSubReddit} = RedditActions;

class SubRedditList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			})
		}
	}

	componentDidMount() {
		const ds = this.state.dataSource;
		const subreddits = getSubReddits();
		this.setState({
			dataSource: ds.cloneWithRows(subreddits)
		});
	}


	_pressSubReddit(name) {
		this.props.dispatch(selectSubReddit(name));
	}

	_renderRow(subreddit, sectionId, rowId) {
		return (
			<SubRedditItem
				onPress={this._pressSubReddit.bind(this, subreddit.name)}
				name={subreddit.name}
			/>
		);
	}

	render() {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderRow.bind(this)}
			/>
		);
	}
}

export default SubRedditList;
