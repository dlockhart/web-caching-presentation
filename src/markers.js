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
		initMarker(this.refs.markerArrow, 12, 12, 2, 6, 'auto');
	},
	render: function() {
		return <defs>
			<marker id="markerArrow" ref="markerArrow">
				<path d="M2,2 L2,10 L10,6 L2,2" className="arrow" />
			</marker>
		</defs>;
	}
});
