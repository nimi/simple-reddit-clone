import React, {
	ListView,
	View,
	Text,
	ProgressBarAndroid,
	ActivityIndicatorIOS,
	Platform,
	StyleSheet,
	Dimensions
} from 'react-native';

import PostItem from './Item';
import {Actions} from 'react-native-router-flux';
import RedditActions from '../../actions/reddit';

const {selectSubReddit, fetchPostsIfNeeded, refreshSubReddit, fetchComments} = RedditActions;

class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			isFetching: true,
			after: "",
			count: 0
		}
	}

	componentDidMount() {
		const { dispatch, selectedSubReddit, after } = this.props;
		dispatch(fetchPostsIfNeeded(selectedSubReddit, this.props.after));
	}

	componentWillReceiveProps(nextProps) {
		const { dispatch, selectedSubReddit, after } = this.props;
		this.setState({
			isFetching: nextProps.isFetching,
			dataSource: this.state.dataSource.cloneWithRows(nextProps.posts),
			count: nextProps.posts.length
		});
		if (nextProps.selectedSubReddit !== this.props.selectedSubReddit) {
			dispatch(fetchPostsIfNeeded(nextProps.selectedSubReddit, nextProps.after));
		}
	}

	onEndReached() {
		const { dispatch, selectedSubReddit, after } = this.props;
		dispatch(fetchPostsIfNeeded(selectedSubReddit, after));
	}

	renderFooter() {
		let LoadingView;

		if (Platform.OS === 'ios') {
			LoadingView = ActivityIndicatorIOS;
		} else {
			LoadingView = ProgressBarAndroid;
		}

		return(
			<View>
				<LoadingView styleAttr='Small' />
			</View>
		)
	}

	renderLoadingView() {
		let LoadingView, loadingStyle = {}, containerStyle = {};

		if (Platform.OS === 'ios') {
			LoadingView = ActivityIndicatorIOS;
			loadingStyle = styles.loadingStyle;
			containerStyle = styles.loadingContainer;
		} else {
			LoadingView = ProgressBarAndroid;

		}

		return(
			<View style={containerStyle}>
				<LoadingView style={loadingStyle} />
			</View>
		)
	}

	renderEmptyView() {
		return <View />;
	}

	_pressPost(post) {
		Actions.postDetail({data: post});
	}

	_pressComments(post) {
		const { dispatch, after } = this.props;

		dispatch(fetchComments(post.id, after));
		Actions.commentView({data: post});
	}

	_renderPosts(post) {
		return(
			<PostItem
				onPress={this._pressPost.bind(this, post)}
				onPressComments={this._pressComments.bind(this, post)}
				title={post.title}
				ups={post.ups}
				thumbnail={post.thumbnail}
				author={post.author}
				preview={post.preview}
				numComments={post.num_comments}
			/>
		);
	}

	render() {
		if (this.state.isFetching && this.state.count === 0) {
			return this.renderLoadingView();
		} else {
			return(
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderPosts.bind(this)}
					renderFooter={this.renderFooter}
					onEndReached={this.onEndReached.bind(this)}
					renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
				/>
			)
		}
	}
}

export default PostList;

const styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: '#CCCCCC'
	},
	loadingContainer: {
		flex: 1
	},
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
