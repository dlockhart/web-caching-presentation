var React = require('react');

module.exports = React.createClass({
	render: function() {
		var myStep = this.props.step || this.props.stepIndex;
		var className = (myStep <= this.props.stepNum) ? 'slide-step-visible' : 'slide-step-hidden';
		return <div className={className}>{this.props.children}</div>;
	}
});
