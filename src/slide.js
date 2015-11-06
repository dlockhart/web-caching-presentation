var React = require('react');

module.exports = React.createClass({
	render: function() {
		var className = 'slide';
		if (this.props.centre) {
			className += ' slide-centre';
		}
		return <div className={className}>{this.props.children}</div>;
	}
});
