import React, {
	View,
	Component
} from 'react-native';
import {connect} from 'react-redux';

import Main from '../components/Main';

function MainContainer(props) {
	return (
		<Main {...props} />
	);
}

function mapStateToProps({selectedSubReddit, postsBySubReddit}) {
	const {
		isFetching,
		items: posts,
		after
	} = postsBySubReddit[selectedSubReddit] || {
		isFetching: true,
		items: [],
		after: ''
	}

	return {
		selectedSubReddit,
		posts,
		isFetching,
		after
	};
}

export default connect(mapStateToProps)(MainContainer);
