var React = require('react');

var column = React.createClass({
	render: function() {

		var centreX = Math.floor(this.props.index * this.props.width + this.props.width / 2) + '%';

		var name = null;
		var image = null;
		if (!this.props.hidden) {
			name = <text x={centreX} y="95" textAnchor="middle">{this.props.data.label}</text>;
			image = <g dangerouslySetInnerHTML={{__html: '<image x=' + centreX + ' y=0 width="75" height="75" xlink:href="images/' + this.props.data.key + '.png" transform="translate(-37,0)"/>'}} />;
		}

		var line = null;
		if (!this.props.isLast) {
			var lineX = (this.props.index + 1) * this.props.width + '%';
			line = <line x1={lineX} y1="0" x2={lineX} y2="100%" />;
		}

		return <g className="column">{line}{image}{name}</g>;

	}
});

module.exports = column;
