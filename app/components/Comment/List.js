import React, {
	View,
	Text,
	Platform,
	ListView,
	Component
} from 'react-native';

class CommentList extends Component {

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

	}

	render() {
		return (
			<View>
				<Text>Comment List</Text>
			</View>
		);
	}
}

export default CommentList;
