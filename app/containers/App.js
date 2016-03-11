import React,  {
	Component,
	StyleSheet,
	Navigator,
	PropTypes,
	View,
	Text,
	BackAndroid,
	ToolbarAndroid,
	Platform
} from 'react-native';

import {
	Router,
	Route,
	Schema,
	Animations,
	TabBar,
	Actions
} from 'react-native-router-flux';

import PostDetail from '../components/Post/Detail';
import CommentView from './Comment';
import MainContainer from './Main';

class App extends Component {
	constructor(props) {
		super(props);
	}

	_isHomeScreen() {
		return Actions.currentRouter.currentRoute.title === 'Home';
	}

	render() {
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this._isHomeScreen()) {
				return false;
			}
			Actions.pop();
			return true;
		});
		const shouldHideToolbar = Platform.OS !== 'ios';
		return (
			<Router hideNavBar={shouldHideToolbar}>
				<Schema name='modal'
					sceneConfig={Navigator.SceneConfigs.FloatFromBottomAndroid}
				/>
				<Route
					name='home'
					component={MainContainer}
					initial={true}
					wrapRouter={false}
					title='Home'
					schema='modal'
					navBar={ToolbarAndroid}
				/>
				<Route
					name='postDetail'
					component={PostDetail}
					title='Post'
					schema='modal'
				/>
				<Route
					name='commentView'
					component={CommentView}
					title='Comments'
					schema='modal'
				/>
			</Router>
		);
	}
}

export default App;
