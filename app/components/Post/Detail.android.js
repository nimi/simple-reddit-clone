import React, {
	View,
	Text,
	BackAndroid,
	ToolbarAndroid,
	StyleSheet,
	NativeModules,
	WebView,
	Component
} from 'react-native';

import {Actions} from 'react-native-router-flux';

class PostDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastVisit: ''
		}
	}

	componentDidMount() {
		NativeModules.SimpleCacheAndroid.getString('lastVisit', val => {
			this.setState({lastVisit: val});
		});
		NativeModules.SimpleCacheAndroid.putString('lastVisit', this.props.data.title);
	}

	render() {
		const {data} = this.props;

		return (
			<View style={styles.container}>
				<ToolbarAndroid
					titleColor='#fff'
					title={this.props.data.title}
					style={styles.toolbar}/>
				<WebView
					automaticallyAdjustContentInsets={true}
					source={{uri: data.url}}
					javascriptEnabled={true}
					scalesPageToFit={true}
					style={styles.webView}
				/>
			</View>
		)
	}
}

export default PostDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	toolbar: {
		backgroundColor: '#222',
		height: 56,
		marginTop: 24,
	}
});
