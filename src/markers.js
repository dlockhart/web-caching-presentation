var React = require('react'),
	ReactDOM = require('react-dom');

function initMarker(ref, width, height, refX, refY, orient) {
	var node = ReactDOM.findDOMNode(ref);
	node.setAttribute('markerWidth', width);
	node.setAttribute('markerHeight', height);
	node.setAttribute('refX', refX);
	node.setAttribute('refY', refY);
	node.setAttribute('orient', orient);
}

module.exports = React.createClass({
	componentDidMount: function() {
		initMarker(this.refs.markerArrowR, 12, 12, 2, 6, 0);
		initMarker(this.refs.markerArrowL, 12, 12, 2, 6, 180);
		initMarker(this.refs.markerArrowD, 12, 12, 2, 6, 90);
	},
	render: function() {
		return <defs>
			<marker id="markerArrowR" ref="markerArrowR">
				<path d="M2,2 L2,10 L10,6 L2,2" className="arrow" />
			</marker>
			<marker id="markerArrowL" ref="markerArrowL">
				<path d="M2,2 L2,10 L10,6 L2,2" className="arrow" />
			</marker>
			<marker id="markerArrowD" ref="markerArrowD">
				<path d="M2,2 L2,10 L10,6 L2,2" className="arrow" />
			</marker>
		</defs>;
	}
});
