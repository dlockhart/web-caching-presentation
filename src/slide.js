var React = require('react');

var numSteps = -1;

module.exports = React.createClass({
	childContextTypes: {
		getStepNum: React.PropTypes.func
	},
	componentWillReceiveProps: function() {
		numSteps = -1;
	},
	getChildContext: function() {
		return {
			getStepNum: function() {
				return ++numSteps;
			}
		};
	},
	render: function() {
		var stepNum = this.props.stepNum;
		var className = 'slide';
		if (this.props.type) {
			className += ' slide-' + this.props.type;
		}
		return <div className={className}>
			{React.Children.map(this.props.children, function(child) {
				return React.cloneElement(child, {stepNum: stepNum});
			})}
		</div>;
	}
});
