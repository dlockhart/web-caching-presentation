var React = require('react');

var column = React.createClass({
	render: function() {
		var lineX = (this.props.index + 1) * this.props.width + '%';
		var nameX = Math.floor(this.props.index * this.props.width + this.props.width / 2) + '%';
		var name = this.props.hidden ? null : <text x={nameX} y="20" textAnchor="middle">{this.props.name}</text>;
		var line = this.props.isLast ? null : <line className="col-sep" x1={lineX} y1="0" x2={lineX} y2="100%" />;
		return <g>{line}{name}</g>;
	}
});

module.exports = column;
