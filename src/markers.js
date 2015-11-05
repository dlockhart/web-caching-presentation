var React = require('react'),
	ReactDOM = require('react-dom');

function initMarker(ref, width, height, refX, refY) {
	var node = ReactDOM.findDOMNode(ref);
	node.setAttribute('markerWidth', width);
	node.setAttribute('markerHeight', height);
	node.setAttribute('refX', refX);
	node.setAttribute('refY', refY);
}

module.exports = React.createClass({
	componentDidMount: function() {
		initMarker(this.refs.markerCircle, 8, 8, 5, 5);
		initMarker(this.refs.markerArrowR, 13, 13, 2, 6);
		initMarker(this.refs.markerArrowL, 13, 13, 2, 6);
	},
	render: function() {
		return <defs>
			<marker id="markerCircle" ref="markerCircle">
				<circle cx="5" cy="5" r="3" />
			</marker>
			<marker id="markerArrowR" ref="markerArrowR" orient="auto">
				<path d="M2,2 L2,11 L10,6 L2,2" className="arrow" />
			</marker>
			<marker id="markerArrowL" ref="markerArrowL" orient="auto">
				<path d="M10,2 L10,11 L2,6 L10,2" className="arrow" />
			</marker>
		</defs>;
	}
});
