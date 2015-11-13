var React = require('react');

var step = React.createClass({
	render: function() {

		var data = this.props.data;

		var colWidth = Math.floor(100 / this.props.cols);
		var start = this.props.columnMap[this.props.prevCol];
		var end = this.props.columnMap[data.end];
		var dir = start < end ? 'R' : 'L';
		var x1 = (start + 1) * colWidth - (colWidth / 2);
		var x2 = (end + 1) * colWidth - (colWidth / 2);

		var y1 = this.props.prevDuration + 180;
		var y2 = y1 + (data.duration / 2);

		var className = 'lineArrow' + dir;
		var style = {
			display: this.props.isVisible ? 'inline' : 'none'
		};

		var label = null;
		if (data.label) {
			var labelX = (x2 - x1) / 2 + x1;
			label = <text x={labelX + '%'} y={y1 - 14} textAnchor="middle">
				{data.label}
			</text>;
		}

		var duration = null;
		if (data.duration) {
			var durationX = (x2 - x1) / 2 + x1;
			duration = <text x={durationX + '%'} y={y1 + 19} textAnchor="middle">
				{data.duration + ' ms'}
			</text>;
		}

		return <g style={style} className="step">
				{label}
				<line ref="line" className={className} x1={x1 + '%'} y1={y1} x2={x2 + '%'} y2={y2} />
				{duration}
			</g>;

	}
});

module.exports = step;
