var React = require('react');

var step = React.createClass({
	render: function() {

		var data = this.props.data;

		var colWidth = Math.floor(100 / this.props.cols);
		var dir = data.start < data.end ? 'R' : 'L';
		var x1 = data.start * colWidth - (colWidth / 2);
		var x2 = data.end * colWidth - (colWidth / 2);

		if (dir === 'R' && data.end !== this.props.cols) {
			x1--;
		} else if (dir === 'L' && data.end !== 1) {
			x2++;
		}
		var y = data.row * 100 - 50;

		var className = 'lineArrow' + dir;
		var style = {
			display: this.props.isVisible ? 'inline' : 'none'
		};

		var label = null;
		if (data.label) {
			var labelX = (x2 - x1) / 2 + x1;
			label = <text x={labelX + '%'} y={y - 8} textAnchor="middle">
				{data.label}
			</text>;
		}

		var duration = null;
		if (data.duration) {
			var durationX = (x2 - x1) / 2 + x1;
			duration = <text x={durationX + '%'} y={y + 17} textAnchor="middle">
				{data.duration + 'ms'}
			</text>;
		}

		return <g style={style}>
				{label}
				<line ref="line" className={className} x1={x1 + '%'} y1={y} x2={x2 + '%'} y2={y} />
				{duration}
			</g>;

	}
});

module.exports = step;
