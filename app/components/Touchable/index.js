import React, {
	TouchableNativeFeedback,
	Platform,
	View
} = 'react-native';

class TouchableComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (Platform.OS === 'ios') {
			return (
				<View></View>
			)
		} else {
			return (
				<TouchableNativeFeedback {...this.props} />
			)
		}
	}
}

export TouchableComponent;
