var React = require('react');

module.exports = React.createClass({
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize: function() {
		this.refs.slide.style.height = window.innerHeight + 'px';
	},
	render: function() {
		return <div ref="slide" className="slide">{this.props.children}</div>;
	}
});
