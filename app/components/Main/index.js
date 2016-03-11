import React, {
	StyleSheet,
	View,
	DrawerLayoutAndroid,
	Text,
	Image,
	ToolbarAndroid,
	Platform,
	PropTypes,
	Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import SubRedditList from '../SubReddit/List';
import PostList from '../Post/List';
import {selectSubReddit, fetchPostsIfNeeded, refreshSubReddit} from '../../actions/reddit';

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	_renderSubreddits() {
		return(
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<View style={styles.menuHeader}>
					<Image
						resizeMode="cover"
						style={styles.menuHeaderBackground}
						source={{uri: 'http://bit.ly/1Ra9QNd'}} />
					<View style={styles.menuHeaderOverlay} />
				</View>
				<SubRedditList {...this.props}/>
			</View>
		);
	}

	render() {
		if (Platform.OS === 'ios') {
			const windowDims = Dimensions.get('window');
			return (
				<View style={{ paddingTop: 65, height: windowDims.height}}>
					<PostList {...this.props} />
				</View>
			)
		}

		return(
			<DrawerLayoutAndroid
				style={styles.container}
				drawerWidth={300}
				renderNavigationView={this._renderSubreddits.bind(this)}
				ref={(drawer) => {this.drawer = drawer}}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
			>
				<ToolbarAndroid
					titleColor="#fff"
					style={styles.toolbar}
					title="React Native Reddit"
				/>
				<PostList {...this.props} />
			</DrawerLayoutAndroid>
		)
	}
}

Main.propTypes = {
	selectedSubReddit: PropTypes.string.isRequired,
	posts: PropTypes.array.isRequired,
	after: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
}

export default Main;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch'
	},
	dummy: {
		flex: 1,
	},
	menuHeader: {
		height: 150,
		justifyContent: 'center',
		padding: 20,
		paddingTop: 50,
	},
	menuHeaderBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	menuHeaderOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	toolbar: {
		backgroundColor: '#222',
		height: 56,
		marginTop: 24,
	},
});
