import React, {
	View,
	Component
} from 'react-native';
import {connect} from 'react-redux';

import Main from '../components/Comment/View';

function CommentContainer(props) {
	return (
		<Main {...props} />
	);
}

const mapStateToProps = state => ({
	comments: state.comments
})

export default connect(mapStateToProps)(CommentContainer);
