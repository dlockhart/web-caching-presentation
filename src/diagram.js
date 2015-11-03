var React = require('react'),
	ReactDOM = require('react-dom'),
	Step = require('./step');

function initMarker(ref, width, height, refX, refY) {
	var node = ReactDOM.findDOMNode(ref);
	node.setAttribute('markerWidth', width);
	node.setAttribute('markerHeight', height);
	node.setAttribute('refX', refX);
	node.setAttribute('refY', refY);
}

var diagram = React.createClass({
	componentDidMount: function() {
		initMarker(this.refs.markerCircle, 8, 8, 5, 5);
		initMarker(this.refs.markerArrowR, 13, 13, 2, 6);
		initMarker(this.refs.markerArrowL, 13, 13, 2, 6);
		window.addEventListener('keydown', this.handleKeyPress);
	},
	componentWillUnmount: function() {
		window.removeEventListener('keydown', this.handleKeyPress);
	},
	getInitialState: function() {
		var cols = [];
		this.props.data.columns.forEach(function(c) {
			cols.push(c.hidden === true);
		});
		return {
			cols: cols,
			step: 0
		};
	},
	handleKeyPress: function(e) {
		switch (e.keyCode) {
			// left
			case 37:
				this.prev();
				break;
			// up
			case 38:
				break;
			// right
			case 39:
				this.next();
				break;
			// down
			case 40:
				break;
		}
	},
	next: function() {

		var cols = this.state.cols.slice();
		for (var i = 0; i < cols.length; i++) {
			if (cols[i]) {
				cols[i] = false;
				this.setState({cols: cols});
				return;
			}
		}

		if (this.state.step < this.props.data.steps.length) {
			this.setState({step: ++this.state.step});
		}

	},
	prev: function() {
		if (this.state.step > 0) {
			this.setState({step: --this.state.step});
		}
	},
	render: function() {
		var cols = this.props.data.columns.length;
		var hiddenCols = this.state.cols;
		var colWidth = Math.floor(100 / cols);
		var style = {
			width: colWidth + '%'
		};
		var step = this.state.step;
		return <div className="diagram">
				<div>
				{this.props.data.columns.map(function(c, index) {
					var name = hiddenCols[index] ? null : c.name;
					return <div key={c.name} className="column" style={style}>{name}</div>;
				})}
				<div className="clear"></div>
			</div>
			<svg width="100%" height="300px">
				<defs>
					<marker id="markerCircle" ref="markerCircle">
						<circle cx="5" cy="5" r="3" />
					</marker>
					<marker id="markerArrowR" ref="markerArrowR" orient="auto">
						<path d="M2,2 L2,11 L10,6 L2,2" className="arrow" />
					</marker>
					<marker id="markerArrowL" ref="markerArrowL" orient="auto">
						<path d="M10,2 L10,11 L2,6 L10,2" className="arrow" />
					</marker>
				</defs>
				{this.props.data.steps.map(function(s, index) {
					var isVisible = index < step;
					return <Step key={index} data={s} cols={cols} isVisible={isVisible} />;
				})}
			</svg>
		</div>;
	}
});

module.exports = diagram;
