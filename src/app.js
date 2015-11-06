var Diagram = require('./diagram'),
	React = require('react'), // eslint-disable-line no-unused-vars
	ReactDOM = require('react-dom'),
	Slide = require('./slide');

var slides = [
	<Slide type="title">
		<h1>Web Caching</h1>
		<h2>Daryl McMillan and Dave Lockhart</h2>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/diagram1.json')} />
	</Slide>,
	<Slide>
		<h1>cache-control header</h1>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/diagram2.json')} />
	</Slide>,
	<Slide type="centre"><h1>Last Slide</h1></Slide>
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
				this.prevSlide();
				break;
			// down
			case 40:
				this.nextSlide();
				break;
			// left
			case 37:
				if (this.state.stepNum > 0) {
					this.setState({stepNum: Math.max(0, --this.state.stepNum)});
				}
				break;
			// right
			case 39:
				this.setState({stepNum: ++this.state.stepNum});
				break;
		}
	},
	nextSlide: function() {
		var slideNum = Math.min(this.state.slideNum + 1, slides.length - 1);
		if (slideNum !== this.state.slideNum) {
			this.setState({slideNum: slideNum, stepNum: 0});
		}
	},
	prevSlide: function() {
		var slideNum = Math.max(0, this.state.slideNum - 1);
		if (slideNum !== this.state.slideNum) {
			this.setState({slideNum: slideNum, stepNum: 0});
		}
	},
	getInitialState: function() {
		return {
			slideNum: 0,
			stepNum: 0
		};
	},
	render: function() {
		var slide = React.cloneElement(
			slides[this.state.slideNum],
			{stepNum: this.state.stepNum}
		);
		return slide;
	}
});

ReactDOM.render(
	<Application />,
	document.getElementById('app')
);
