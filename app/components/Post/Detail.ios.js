import React, {
	View,
	Text,
	StyleSheet,
	NativeModules,
	WebView,
	Component,
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
		NativeModules.SimpleCache.getString('lastVisit', val => {
			this.setState({lastVisit: val});
		});
		NativeModules.SimpleCache.putString('lastVisit', this.props.data.title);
	}

	render() {
		const {data} = this.props;

		return (
			<View style={styles.container}>
				<WebView
					automaticallyAdjustContentInsets={true}
					source={{uri: data.url}}
					scalesPageToFit={true}
					style={styles.webView}
				/>
			</View>
		)
	}
}

export default PostDetail;

var styles = StyleSheet.create({
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
