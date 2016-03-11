import React, {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
	Image,
	DrawerLayoutAndroid,
	ToolbarAndroid,
	Component,
	Dimensions
} from 'react-native';

import CommentList from './List';

class CommentView extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (Platform.OS === 'ios') {
			const windowDims = Dimensions.get('window');
			return (
				<View style={{ paddingTop: 65, height: windowDims.height}}>
					<CommentList {...this.props} />
				</View>
			)
		}

		return(
			<View>
				<ToolbarAndroid
					titleColor="#fff"
					style={styles.toolbar}
					title="React Native Reddit"
				/>
					<CommentList {...this.props} />
			</View>
		)
	}
}

export default CommentView;

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
