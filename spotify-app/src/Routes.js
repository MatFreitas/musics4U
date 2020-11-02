import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import Home from './Home';

export default function Routes() {
	return (
		<Router>
			<Route exact path="/" component={App} />
			<Route path="/home/" component={Home} />
		</Router>
	);
}
