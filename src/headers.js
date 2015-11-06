var React = require('react');

var headers = React.createClass({
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
		this.handleResize();
	},
	handleResize: function() {
		this.refs.headers.style.height = window.innerHeight + 'px';
	},
	render: function() {
		return <div ref="headers" className="headers">
			<h2>Response Headers</h2>
			<ul>
			{this.props.data.map(function(h) {
				var style = {
					color: h.new ? 'red' : null
				};
				return <li key={h.key}>
					<span style={style}><strong>{h.key}:</strong><br /> {h.value}</span>
				</li>;
			})}
			</ul>
		</div>;
	}
});

module.exports = headers;
