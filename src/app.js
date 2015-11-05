var Diagram = require('./diagram'),
	React = require('react'), // eslint-disable-line no-unused-vars
	ReactDOM = require('react-dom');

var diagrams = [
	require('./diagrams/diagram1.json'),
	require('./diagrams/diagram2.json')
];

var Application = React.createClass({
	componentDidMount: function() {
		window.addEventListener('keydown', this.handleKeyPress);
	},
	componentWillUnmount: function() {
		window.removeEventListener('keydown', this.handleKeyPress);
	},
	handleKeyPress: function(e) {
		switch (e.keyCode) {
			// up
			case 38:
				this.prev();
				break;
			// down
			case 40:
				this.next();
				break;
		}
	},
	next: function() {
		var diagramNum = Math.min(this.state.diagramNum + 1, diagrams.length - 1);
		if (diagramNum !== this.state.diagramNum) {
			this.setState({diagramNum: diagramNum});
		}
	},
	prev: function() {
		var diagramNum = Math.max(0, this.state.diagramNum - 1);
		if (diagramNum !== this.state.diagramNum) {
			this.setState({diagramNum: diagramNum});
		}
	},
	getInitialState: function() {
		return {
			diagramNum: 0
		};
	},
	render: function() {
		return <Diagram data={diagrams[this.state.diagramNum]} />;
	}
});

ReactDOM.render(
	<Application />,
	document.getElementById('app')
);
