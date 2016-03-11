import React, {
	Component,
	PropTypes,
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableNativeFeedback
} from 'react-native';

class SubRedditItem extends Component {
	static propTypes = {
		onPress: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		let TouchableComponent;
		let buttonProps = {};
		if (Platform.OS === 'ios') {

		} else {
			TouchableComponent = TouchableNativeFeedback;
			buttonProps = {
				background: TouchableNativeFeedback.Ripple('#f00', false)
			}
		}
		return(
			<TouchableComponent {...buttonProps} onPress={this.props.onPress}>
				<View>
					<Text style={styles.item}>{this.props.name}</Text>
				</View>
			</TouchableComponent>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		margin: 8,
		color: '#f00'
	}
});

export default SubRedditItem;
