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
		var y2 = y1 + ((data.duration > 0 ? Math.max(data.duration, 50) : 0) * this.props.msPixels);

		var style = {
			display: this.props.isVisible ? 'inline' : 'none'
		};

		var labelText = data.label || '';
		if (data.label) {
			var labelX = (x2 - x1) / 2 + x1;
			var labelY = (y2 - y1) / 2 + y1;
			var labelTextAnchor = 'middle';
			if (dir === 'R') {
				labelY = labelY - 14;
			} else if (dir === 'L') {
				labelY = labelY - 14;
			} else {
				labelX = labelX + 20;
				labelY = labelY + 14;
				labelTextAnchor = 'start';
			}
		}
		if (data.duration) {
			labelText += ' (' + data.duration + 'ms)';
		}

		return <g style={style} className="step">
				<text x={labelX + 'px'} y={labelY} textAnchor={labelTextAnchor}>{labelText}</text>
				<path d={'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2} className="lineArrow" />
			</g>;

	}
});

module.exports = step;
