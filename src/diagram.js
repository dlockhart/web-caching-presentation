var React = require('react'),
	Column = require('./column'),
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
		this.refs.diagram.style.height = window.innerHeight + 'px';
		this.forceUpdate();
	},
	render: function() {

		var cols = this.props.data.columns.length;
		var colWidth = Math.floor(100 / cols);
		var stepNum = this.props.stepNum;
		var height = window.innerHeight - 250;

		var numHiddenCols = 0;
		var columnMap = {};
		var columnIndex = 0;
		this.props.data.columns.forEach(function(c) {
			columnMap[c.key] = columnIndex;
			if (c.hidden) {
				numHiddenCols++;
			}
			columnIndex++;
		});

		var actualStep = stepNum - numHiddenCols;
		var totalDuration = 0;
		var totalX = 0;
		for (var i = 0; i < this.props.data.steps.length; i++) {
			var d = this.props.data.steps[i].duration;
			totalDuration += d;
			if (d > 0) {
				totalX += Math.max(this.props.data.steps[i].duration, 50);
			}
		}
		var msPixels = (height / totalX);

		var duration = null;
		if (actualStep > this.props.data.steps.length) {
			duration = <text className="total" x="50%" y={window.innerHeight - 80} textAnchor="middle">{'Total: ' + totalDuration + ' ms'}</text>;
		}

		var hiddenColIndex = 0;
		var prevDuration = 0;
		var prevCol = this.props.data.columns[0].key;

		return <div className="diagram" ref="diagram">
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
				<line className="sep" x1="0" y1="110" x2="100%" y2="110" />
				{this.props.data.steps.map(function(s, index) {
					var isVisible = index < actualStep;
					var step = <Step key={index} data={s} columnMap={columnMap} cols={cols} prevCol={prevCol} isVisible={isVisible} prevDuration={prevDuration} msPixels={msPixels} />;
					var pd = s.duration > 0 ? Math.max(s.duration, 50) : 0;
					prevDuration += (pd * msPixels);
					prevCol = s.end;
					return step;
				})}
				{duration}
			</svg>
		</div>;
	}
});

module.exports = diagram;
