var React = require('react');

module.exports = React.createClass({
	contextTypes: {
		getStepNum: React.PropTypes.func
	},
	componentWillMount: function() {
		this.myStepNum = this.context.getStepNum();
	},
	render: function() {
		var className = (this.myStepNum <= this.props.stepNum) ? 'slide-step slide-step-visible' : 'slide-step';
		return <div className={className}>{this.props.children}</div>;
	}
});
