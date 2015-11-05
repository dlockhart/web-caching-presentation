var React = require('react');

var headers = React.createClass({
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
		this.handleResize();
	},
	handleResize: function() {
		this.refs.headers.style.height = window.innerHeight + 'px';
	},
	render: function() {
		return <div ref="headers" className="headers">
		</div>;
	}
});

module.exports = headers;
