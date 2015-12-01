var Diagram = require('./diagram'),
	React = require('react'), // eslint-disable-line no-unused-vars
	ReactDOM = require('react-dom'),
	Slide = require('./slide'),
	Step = require('./slide-step');

var slides = [
	<Slide type="title">
		<h1>Web Caching</h1>
		<em>Daryl McMillan and Dave Lockhart</em>
	</Slide>,
	<Slide>
		<h1>HTTP Headers Review</h1>
		<Step>
			<h2>Request</h2>
			<pre className="box">
				<strong>Accept:</strong> text/html,application/xhtml+xml,application/xml;<br />
				<strong>Accept-Encoding:</strong> gzip, deflate, sdch<br />
				<strong>Accept-Language:</strong> en-US,en;q=0.8,fr;q=0.6<br />
				<strong>Cookie:</strong> blah blah<br />
				<strong>Host:</strong> developer.mozilla.org<br />
				<strong>User-Agent:</strong> Mozilla/5.0 (Macintosh; AppleWebKit/537.36
			</pre>
		</Step>
		<Step>
			<h2>Response</h2>
			<pre className="box">
				<strong>Content-Encoding:</strong> gzip<br />
				<strong>Content-Type:</strong> text/html; charset=utf-8<br />
				<strong>Date:</strong> Tue, 01 Dec 2015 01:50:49 GMT<br />
				<strong>Last-Modified:</strong> Tue, 17 Nov 2015 20:41:07 GMT<br />
			</pre>
		</Step>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/1-no-caching.json')} />
	</Slide>,
	<Slide>
		<h1>Application Caching</h1>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/2-app-caching.json')} />
	</Slide>,
	<Slide>
		<h1>Output Caching</h1>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/3-output-caching.json')} />
	</Slide>,
	<Slide>
		<h1>Conditional GET</h1>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/4-conditional-get.json')} />
	</Slide>,
	<Slide>
		<h1>Cache-Control Header</h1>
		<p>Talk about public vs. private and max-age.</p>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/5-max-age.json')} />
	</Slide>,
	<Slide>
		<h1>CDN</h1>
		<p>Talk about what a CDN is, advantages, when to use them and the Brightspace CDN.</p>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/6-all-together.json')} />
	</Slide>,
	<Slide>
		<h1>Summary</h1>
		<p>
			List out a bullet of each thing learned.
		</p>
	</Slide>,
	<Slide>
		<h1>Tips</h1>
		<p>
			List out some additional tips.
		</p>
	</Slide>,
	<Slide type="title">
		<h1>Questions?</h1>
	</Slide>
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
