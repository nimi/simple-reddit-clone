import React, {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
	Image,
	Component,
	PropTypes
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {DEFAULT_THUMBNAIL, isValidThumbnail} from '../../utils';

class PostItem extends Component {
	static defaultThumbnail = 'http://i.imgur.com/SpbPlMU.png';

	static propTypes = {
		onPress: PropTypes.func.isRequired,
		onPressComments: PropTypes.func,
		title: PropTypes.string.isRequired,
		ups: PropTypes.number.isRequired,
		thumbnail: PropTypes.string,
		author: PropTypes.string.isRequired,
		preview: PropTypes.object,
		numComments: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		const isValid = isValidThumbnail(this.props.thumbnail);
		const imageSource = isValid ?
			this.props.thumbnail :
			PostItem.defaultThumbnail;

		let TouchableComponent, buttonProps;

		if (Platform.OS === 'ios') {
			TouchableComponent = TouchableOpacity;
		} else {
			TouchableComponent = TouchableNativeFeedback;
			buttonProps = {
				background: TouchableNativeFeedback.Ripple('#ddd', false)
			}
		}

		return (
			<View>
				<View style={styles.container}>
					<TouchableComponent {...buttonProps} onPress={this.props.onPress}>
						<View style={styles.photoContainer}>
							<Image
								source={{uri: imageSource}}
								style={styles.thumbnail}
							/>
						</View>
					</TouchableComponent>
					<TouchableComponent style={styles.middleContainer} {...buttonProps} onPress={this.props.onPress}>
						<View style={styles.middleContainer}>
							<Text style={styles.title}>{this.props.title}</Text>
							<Text style={styles.author}>{this.props.author}</Text>
						</View>
					</TouchableComponent>
					<View>
						<Text style={styles.ups}>{this.props.ups}</Text>
						<TouchableComponent {...buttonProps} onPress={this.props.onPressComments}>
							<View>
							<Text style={styles.comments}>
								{this.props.numComments}
							</Text>
							</View>
						</TouchableComponent>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	},
	middleContainer: {
		flex: 1,
		marginTop: 3,
		paddingLeft: 10,
		paddingRight: 10
	},
	ups: {
		flex: 0.3,
		fontSize: 12,
		marginTop: 10,
		marginRight: 5,
		padding: 5,
		color: '#369',
		backgroundColor: '#EFF7FF'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
		marginBottom: 2
	},
	author: {
		color: '#949494',
		fontSize: 12
	},
	comments: {
		fontSize: 12,
		marginTop: 20,
		backgroundColor: '#EEEEEE',
		padding: 5
	},
	photoContainer: {
		flex: 0.3
	},
	thumbnail: {
		width: 80,
		height: 80,
		marginTop: 5,
		marginBottom: 5
	}
});

export default PostItem;
