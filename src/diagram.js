var React = require('react'),
	Column = require('./column'),
	Headers = require('./headers'),
	Markers = require('./markers'),
	Step = require('./step');

var diagram = React.createClass({
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize: function() {
		this.refs.steps.style.height = window.innerHeight + 'px';
		this.refs.steps.style.width = (window.innerWidth - 301) + 'px';
	},
	render: function() {

		var cols = this.props.data.columns.length;
		var colWidth = Math.floor(100 / cols);
		var stepNum = this.props.stepNum;

		var numHiddenCols = 0;
		this.props.data.columns.forEach(function(c) {
			if (c.hidden) {
				numHiddenCols++;
			}
		});

		var actualStep = stepNum - numHiddenCols;
		var headers = [];
		var totalDuration = 0;
		for (var i = 0; i < actualStep && i < this.props.data.steps.length; i++) {
			var s = this.props.data.steps[i];
			if (s.headers) {
				for (var j = 0; j < s.headers.length; j++) {
					var header = s.headers[j];
					header.new = (actualStep - 1 === i);
					headers.push(header);
				}
			}
			if (s.duration) {
				totalDuration += s.duration;
			}
		}

		var duration = null;
		if (actualStep > this.props.data.steps.length) {
			duration = <text x="50%" y="80%" textAnchor="middle">{totalDuration + 'ms'}</text>;
		}

		var hiddenColIndex = 0;

		return <div className="diagram">
			<div ref="steps" className="steps">
				<h1>{this.props.data.name}</h1>
				<svg>
					<Markers />
					{this.props.data.columns.map(function(c, index) {
						var isVisible = !c.hidden;
						if (c.hidden) {
							isVisible = hiddenColIndex < stepNum;
							hiddenColIndex++;
						}
						return <Column key={c.key} index={index} width={colWidth} data={c} hidden={!isVisible} isLast={index === cols - 1} />;
					})}
					<line className="sep" x1="0" y1="120" x2="100%" y2="120" />
					{this.props.data.steps.map(function(s, index) {
						var isVisible = index < actualStep;
						return <Step key={index} data={s} cols={cols} isVisible={isVisible} />;
					})}
					{duration}
				</svg>
			</div>
			<Headers data={headers} />
			<div className="clear"></div>
		</div>;
	}
});

module.exports = diagram;
