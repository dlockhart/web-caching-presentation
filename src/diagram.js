var React = require('react'),
	Column = require('./column'),
	Headers = require('./headers'),
	Markers = require('./markers'),
	Step = require('./step');

function calculateState(columns) {
	var cols = [];
	columns.forEach(function(c) {
		cols.push(c.hidden === true);
	});
	return {
		cols: cols,
		step: 0
	};
}

var diagram = React.createClass({
	componentDidMount: function() {
		window.addEventListener('keydown', this.handleKeyPress);
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState(calculateState(nextProps.data.columns));
	},
	componentWillUnmount: function() {
		window.removeEventListener('keydown', this.handleKeyPress);
		window.removeEventListener('resize', this.handleResize);
	},
	getInitialState: function() {
		return calculateState(this.props.data.columns);
	},
	handleKeyPress: function(e) {
		switch (e.keyCode) {
			// left
			case 37:
				this.prev();
				break;
			// right
			case 39:
				this.next();
				break;
		}
	},
	handleResize: function() {
		this.refs.steps.style.height = window.innerHeight + 'px';
		this.refs.steps.style.width = (window.innerWidth - 301) + 'px';
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
		var step = this.state.step;
		return <div className="diagram">
			<div ref="steps" className="steps">
				<svg>
					<Markers />
					{this.props.data.columns.map(function(c, index) {
						return <Column key={index} index={index} width={colWidth} name={c.name} hidden={hiddenCols[index] === true} isLast={index === cols - 1} />;
					})}
					{this.props.data.steps.map(function(s, index) {
						var isVisible = index < step;
						return <Step key={index} data={s} cols={cols} isVisible={isVisible} />;
					})}
				</svg>
			</div>
			<Headers />
			<div className="clear"></div>
		</div>;
	}
});

module.exports = diagram;
