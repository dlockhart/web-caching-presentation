var React = require('react');

module.exports = React.createClass({
	render: function() {
		var stepNum = this.props.stepNum;
		var className = 'slide';
		if (this.props.centre) {
			className += ' slide-centre';
		}
		return <div className={className}>
			{React.Children.map(this.props.children, function(child) {
				return React.cloneElement(child, {stepNum: stepNum});
			})}
		</div>;
	}
});
