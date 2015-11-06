var Diagram = require('./diagram'),
	React = require('react'), // eslint-disable-line no-unused-vars
	ReactDOM = require('react-dom'),
	Slide = require('./slide');

var slides = [
	<Slide>
		<h1>Web Caching</h1>
		<h2>Daryl McMillan and Dave Lockhart</h2>
	</Slide>,
	<Diagram data={require('./diagrams/diagram1.json')} />,
	<Slide>
		<h1>cache-control header</h1>
	</Slide>,
	<Diagram data={require('./diagrams/diagram2.json')} />,
	<Slide>Last Slide</Slide>
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
		var slideNum = Math.min(this.state.slideNum + 1, slides.length - 1);
		if (slideNum !== this.state.slideNum) {
			this.setState({slideNum: slideNum});
		}
	},
	prev: function() {
		var slideNum = Math.max(0, this.state.slideNum - 1);
		if (slideNum !== this.state.slideNum) {
			this.setState({slideNum: slideNum});
		}
	},
	getInitialState: function() {
		return {
			slideNum: 0
		};
	},
	render: function() {
		return slides[this.state.slideNum];
	}
});

ReactDOM.render(
	<Application />,
	document.getElementById('app')
);
