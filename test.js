import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import ReactTransitionGroup from 'react-addons-transition-group';
import ReactRouterPageSlider from './react-router-pageslider';
	
const PageSlider = ReactRouterPageSlider();

const App = React.createClass({
	render() {
		return (
			<ReactTransitionGroup component="div" className="App">
				{
					this.props.children && React.cloneElement(this.props.children, {
						key: this.props.location.pathname
					})
				}
			</ReactTransitionGroup>
		)
	}
});

/* remember not to mutate props */
const Page1 = React.createClass({
	mixins: [PageSlider],

	render() {
		return (
			// ajacent html tag is not allowed.
			<div className="page" id="page1">
				<Link className="link" to="/page2">page2</Link>
				<Link className="link" to="/page3">page3</Link>
			</div>
		);
	}
});

const Page2 = React.createClass({
	mixins: [PageSlider],

	render() {
		return (
			// ajacent html tag is not allowed.
			<div className="page" id="page2">
				<Link className="link" to="/page1">page1</Link>
				<Link className="link" to="/page3">page3</Link>
			</div>
		);
	}
});

const Page3 = React.createClass({
	mixins: [PageSlider],

	render() {
		return (
			// ajacent html tag is not allowed.
			<div className="page" id="page3">
				<Link className="link" to="/page1">page1</Link>
				<Link className="link" to="/page2">page2</Link>
			</div>
		);
	}
});

ReactDom.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Page1}/>
			<Route path="/page1" component={Page1} />
			<Route path="/page2" component={Page2} />
			<Route path="/page3" component={Page3} />
		</Route>
	</Router>
), document.getElementById('content'));