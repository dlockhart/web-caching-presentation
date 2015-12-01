var Diagram = require('./diagram'),
	React = require('react'), // eslint-disable-line no-unused-vars
	ReactDOM = require('react-dom'),
	Slide = require('./slide'),
	Step = require('./slide-step');

var slides = [
	<Slide type="title">
		<h1>Web Caching</h1>
		<em>Daryl McMillan and Dave Lockhart</em>
		<div>
			<img className="profile" src="images/daryl.jpg" />
			<img className="profile" src="images/dave.jpg" />
		</div>
		<Step step="1">
			<img className="unleashed" src="images/unleashed.png" />
		</Step>
	</Slide>,
	<Slide>
		<h1>HTTP Headers Review</h1>
		<Step>
			<h2>Request</h2>
			<pre className="box">
				<strong>Accept:</strong> text/html,application/xhtml+xml,application/xml;<br />
				<strong>Accept-Encoding:</strong> gzip, deflate, sdch<br />
				<strong>Accept-Language:</strong> en-US,en;q=0.8,fr;q=0.6<br />
				<strong>Cookie:</strong> blah blah<br />
				<strong>Host:</strong> developer.mozilla.org<br />
				<strong>User-Agent:</strong> Mozilla/5.0 (Macintosh; AppleWebKit/537.36
			</pre>
		</Step>
		<Step>
			<h2>Response</h2>
			<pre className="box">
				<strong>Content-Encoding:</strong> gzip<br />
				<strong>Content-Type:</strong> text/html; charset=utf-8<br />
				<strong>Date:</strong> Tue, 01 Dec 2015 01:50:49 GMT<br />
				<strong>Last-Modified:</strong> Tue, 17 Nov 2015 20:41:07 GMT<br />
			</pre>
		</Step>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/1-no-caching.json')} />
	</Slide>,
	<Slide>
		<h1>Application Caching</h1>
		<ul>
			<li>Memcached, Redis, ElastiCache</li>
			<li>Before fetching data, check the cache</li>
			<li>After fetching data, write to the cache</li>
		</ul>
		<Step>test</Step>
	</Slide>,
	<Slide>
		<Step step={1}><pre className="newstuff">
		{'cache.Get(\n'}
		{'	"profile_{userId}",\n'}
		{'	() =>\n'}</pre></Step><pre className="oldstuff">
		{'		db.Query(\n'}
		{'			@"SELECT\n'}
		{'				UserId,\n'}
		{'				Name,\n'}
		{'				StatusMessage,\n'}
		{'				ProfileImage\n'}
		{'			FROM PROFILES\n'}
		{'			WHERE UserId = {userId}"\n'}
		{'		)\n'}</pre><Step step={1}><pre className="newstuff">
		{')\n'}
		</pre></Step>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/2-app-caching.json')} />
	</Slide>,
	<Slide>
		<h1>Cache Invalidation</h1>
	</Slide>,
	<Slide>
		<Step step={1}><pre className="newstuff smalltext">
		{'cache.Set(\n'}
		{'	"profile_{userId}",\n'}
		{'	() =>\n'}</pre></Step><pre className="oldstuff smalltext">
		{'		db.Execute(\n'}
		{'			@"UPDATE PROFILES SET\n'}
		{'				Name = {name},\n'}
		{'				StatusMessage = {statusMessage}\n'}
		{'			WHERE\n'}
		{'				UserId = {userId}"\n'}
		{'		)\n'}</pre><Step step={1}><pre className="newstuff smalltext">
		{')\n'}</pre></Step>

		<Step step={2}><pre className="newstuff smalltext">
		{'cache.Set(\n'}
		{'	"profile_{userId}",\n'}
		{'	() =>\n'}</pre></Step><pre className="oldstuff smalltext">
		{'		db.Execute(\n'}
		{'			@"UPDATE PROFILES SET\n'}
		{'				ProfileImage = {profileImage}\n'}
		{'			WHERE\n'}
		{'				UserId = {userId}\n'}
		{'		)\n'}</pre><Step step={2}><pre className="newstuff smalltext">
		{')\n'}</pre></Step>
		
		<Step step={3}><pre className="newstuff smalltext">
		{'cache.Set(\n'}
		{'	id => "profile_{id}",\n'}
		{'	() =>\n'}</pre></Step><pre className="oldstuff smalltext">
		{'		db.Execute(\n'}
		{'			@"INSERT PROFILES (\n'}
		{'				Name,\n'}
		{'				StatusMessage\n'}
		{'			) VALUES (\n'}
		{'				{name},\n'}
		{'				{statusMessage}\n'}
		{'			)"\n'}
		{'		)\n'}
		</pre><Step step={3}><pre className="newstuff smalltext">
		{')\n'}
		</pre></Step>
	</Slide>,
	<Slide>
		<h1>Application Caching Tradeoffs</h1>
		<Step step={1}>Speed vs Freshness</Step>
		<Step step={2}>Speed vs Complexity</Step>
		<Step step={3}>Hits vs Misses</Step>
	</Slide>,
	<Slide>
		<h1>Output Caching</h1>
	</Slide>,
	<Slide>
		<pre className="oldstuff">
		{'var data = getData()\n'}
		{'return\n'}</pre><Step step={1}><pre className="newstuff">
		{'	cache.Get(\n'}
		{'		"profilepage_{data.userId}_{data.version}",\n'}
		{'		() =>\n'}</pre></Step><pre className="oldstuff">
		{'			renderPage( data )\n'}</pre><Step step={1}><pre className="newstuff">
		{'	)\n'}
		</pre></Step>
	</Slide>,
	<Slide>

		<pre className="oldstuff smalltext">
		{'db.Execute(\n'}
		{'	@"UPDATE PROFILES SET\n'}</pre>
		<Step step={1}><pre className="newstuff smalltext">
		{'		Version = Version + 1,\n'}
		</pre></Step>
		<pre className="oldstuff smalltext">
		{'		Name = {name},\n'}
		{'		StatusMessage = {statusMessage}\n'}
		{'	WHERE\n'}
		{'		UserId = {userId}\n'}
		</pre>


		<pre className="oldstuff smalltext">
		{'db.Execute(\n'}
		{'	@"UPDATE PROFILES SET\n'}</pre>
		<Step step={2}><pre className="newstuff smalltext">
		{'		Version = Version + 1,\n'}
		</pre></Step>
		<pre className="oldstuff smalltext">
		{'		ProfileImage = {profileImage}\n'}
		{'	WHERE\n'}
		{'		UserId = {userId}\n'}
		</pre>


		<pre className="oldstuff smalltext">
		{'db.Execute(\n'}
		{'	@"INSERT PROFILES (\n'}</pre>
		<Step step={3}><pre className="newstuff smalltext">
		{'		Version,\n'}
		</pre></Step>
		<pre className="oldstuff smalltext">
		{'		Name,\n'}
		{'		StatusMessage\n'}
		{'	) VALUES (\n'}</pre>
		<Step step={3}><pre className="newstuff smalltext">
		{'		1,\n'}
		</pre></Step>
		<pre className="oldstuff smalltext">
		{'		{name},\n'}
		{'		{statusMessage}\n'}
		{'	)\n'}
		</pre>

	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/3-output-caching.json')} />
	</Slide>,
	<Slide>
		<h1>Output Caching Tradeoffs</h1>
	</Slide>,
	<Slide>
		<h1>Conditional GET</h1>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/4-conditional-get.json')} />
	</Slide>,
	<Slide>
		<h1>Conditional GET Tradeoffs</h1>
	</Slide>,
	<Slide>
		<h1>Cache-Control Header</h1>
		<p>Talk about public vs. private and max-age.</p>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/5-max-age.json')} />
	</Slide>,
	<Slide>
		<h1>Cache-Control Header Tradeoffs</h1>
	</Slide>,
	<Slide>
		<h1>CDN</h1>
		<p>Talk about what a CDN is, advantages, when to use them and the Brightspace CDN.</p>
	</Slide>,
	<Slide>
		<Diagram data={require('./diagrams/6-all-together.json')} />
	</Slide>,
	<Slide>
		<h1>CDN Tradeoffs</h1>
	</Slide>,
	<Slide>
		<h1>Summary</h1>
		<p>
			List out a bullet of each thing learned.
		</p>
	</Slide>,
	<Slide>
		<h1>Tips</h1>
		<p>
			List out some additional tips.
		</p>
	</Slide>,
	<Slide type="title">
		<h1>Questions?</h1>
	</Slide>
];

var Application = React.createClass({
	componentDidMount: function() {
		window.addEventListener('keydown', this.handleKeyPress);
	},
	componentWillUnmount: function() {
		window.removeEventListener('keydown', this.handleKeyPress);
	},
	handleKeyPress: function(e) {
		switch (e.keyCode) {
			// up
			case 38:
				this.prevSlide();
				break;
			// down
			case 40:
				this.nextSlide();
				break;
			// left
			case 37:
				if (this.state.stepNum > 0) {
					this.setState({stepNum: Math.max(0, --this.state.stepNum)});
				}
				break;
			// right
			case 39:
				this.setState({stepNum: ++this.state.stepNum});
				break;
		}
	},
	nextSlide: function() {
		var slideNum = Math.min(this.state.slideNum + 1, slides.length - 1);
		if (slideNum !== this.state.slideNum) {
			this.setState({slideNum: slideNum, stepNum: 0});
		}
	},
	prevSlide: function() {
		var slideNum = Math.max(0, this.state.slideNum - 1);
		if (slideNum !== this.state.slideNum) {
			this.setState({slideNum: slideNum, stepNum: 0});
		}
	},
	getInitialState: function() {
		return {
			slideNum: 0,
			stepNum: 0
		};
	},
	render: function() {
		var slide = React.cloneElement(
			slides[this.state.slideNum],
			{stepNum: this.state.stepNum}
		);
		return slide;
	}
});

ReactDOM.render(
	<Application />,
	document.getElementById('app')
);
