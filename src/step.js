var React = require('react');

var step = React.createClass({
	componentDidMount: function() {
		//var length = this.refs.line.getTotalLength();
		//console.log(length);
	},
	render: function() {
		var colWidth = Math.floor(100 / this.props.cols);
		var dir = this.props.data.start < this.props.data.end ? 'R' : 'L';
		var x1 = this.props.data.start * colWidth - (colWidth / 2);
		var x2 = this.props.data.end * colWidth - (colWidth / 2);
		if (dir === 'R' && this.props.data.end !== this.props.cols) {
			x1--;
		} else if (dir === 'L' && this.props.data.end !== 1) {
			x2++;
		}
		var y = this.props.data.row * 100 - 50;
		var className = 'lineArrow' + dir;
		var style = {
			display: this.props.isVisible ? 'inline' : 'none'
		};
		return <line ref="line" className={className} x1={x1 + '%'} y1={y} x2={x2 + '%'} y2={y} style={style} />;
	}
});

module.exports = step;
