var React = require('react');

var step = React.createClass({
	render: function() {

		var data = this.props.data;

		var colWidth = Math.floor(window.innerWidth / this.props.cols);
		var start = this.props.columnMap[this.props.prevCol];
		var end = this.props.columnMap[data.end];
		var dir = start < end ? 'R' : ((start > end) ? 'L' : 'D');
		var x1 = (start + 1) * colWidth - (colWidth / 2);
		var x2 = (end + 1) * colWidth - (colWidth / 2);

		var y1 = this.props.prevDuration + 170;
		var y2 = y1 + (data.duration * this.props.msPixels);

		var style = {
			display: this.props.isVisible ? 'inline' : 'none'
		};

		var label = null;
		var duration = null;
		if (data.label) {
			var labelX = (x2 - x1) / 2 + x1;
			var labelY = (y2 - y1) / 2 + y1;
			var labelTextAnchor = 'middle';
			if (dir === 'R') {
				labelY = labelY - 14;
			} else if (dir === 'L') {
				labelY = labelY - 14;
			} else {
				labelX = labelX + 2;
				labelTextAnchor = 'start';
			}
			if (data.duration) {
				labelY = labelY - 20;
				duration = <text x={labelX + 'px'} y={labelY + 25} textAnchor={labelTextAnchor}>{ data.duration + ' ms'}</text>;
			}
			label = <text x={labelX + 'px'} y={labelY} textAnchor={labelTextAnchor}>
				{data.label}
			</text>;
		}

		return <g style={style} className="step">
				{label}{duration}
				<path d={'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2} className="lineArrow" />
			</g>;

	}
});

module.exports = step;
