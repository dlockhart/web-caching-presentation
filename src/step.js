var React = require('react');

var step = React.createClass({
	render: function() {

		var data = this.props.data;

		var colWidth = Math.floor(100 / this.props.cols);
		var start = this.props.columnMap[data.start];
		var end = this.props.columnMap[data.end];
		var dir = start < end ? 'R' : 'L';
		var x1 = (start + 1) * colWidth - (colWidth / 2);
		var x2 = (end + 1) * colWidth - (colWidth / 2);

		if (dir === 'R' && end !== this.props.cols - 1) {
			x1--;
		} else if (dir === 'L' && end !== 0) {
			x2++;
		}
		var y = (data.row - 1) * 100 + 180;

		var className = 'lineArrow' + dir;
		var style = {
			display: this.props.isVisible ? 'inline' : 'none'
		};

		var label = null;
		if (data.label) {
			var labelX = (x2 - x1) / 2 + x1;
			label = <text x={labelX + '%'} y={y - 14} textAnchor="middle">
				{data.label}
			</text>;
		}

		var duration = null;
		if (data.duration) {
			var durationX = (x2 - x1) / 2 + x1;
			duration = <text x={durationX + '%'} y={y + 19} textAnchor="middle">
				{data.duration + 'ms'}
			</text>;
		}

		return <g style={style} className="step">
				{label}
				<line ref="line" className={className} x1={x1 + '%'} y1={y} x2={x2 + '%'} y2={y} />
				{duration}
			</g>;

	}
});

module.exports = step;
