var Diagram = require('./diagram'),
	React = require('react'), // eslint-disable-line no-unused-vars
	ReactDOM = require('react-dom'),
	diagram1 = require('./diagram1.json');

ReactDOM.render(
	<Diagram data={diagram1} />,
	document.getElementById('app')
);
