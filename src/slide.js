var React = require('react');

module.exports = React.createClass({
	render: function() {
		var stepNum = this.props.stepNum;
		var className = 'slide';
		if (this.props.type) {
			className += ' slide-' + this.props.type;
		}
		var index = -1;
		return <div className={className}>
			{React.Children.map(this.props.children, function(child) {
				index++;
				return React.cloneElement(child, {stepNum: stepNum, stepIndex: index});
			})}
		</div>;
	}
});
