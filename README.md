# react-router-pageslider
React Router PageSlider is implemented with react-router, based on hashHistory. served as mixin of components.
Making page slide as route changes.

## Installation
``` npm i react-router-pageslider ```

## Watch Out
An ES6 compiler such as [babel](http://babeljs.io/) is required within your workflow, which transpiles your ES6 code into ES5(defined in .babelrc file).

## Basic Usage

### Mixin
```js
// import pageslider module
import ReactRouterPageSlider from 'react-router-pageslider';

// get mixin object
// options is optional
const PageSlider = ReactRouterPageSlider(options ?: Object);

const Page1 = React.createClass({
	mixins: [PageSlider],
	render() {
		return (
			// content of your component
		);
	}
});
```

### Route Config
```js
ReactDom.render((
	<Router history={hashHistory}>
		<Route path="/" component={/*Your Container Component*/}>
			<IndexRoute component={/*Your Default Page*/}/>
			{/* page routes here */}
		</Route>
	</Router>
), container);
```

### TransitionGroup
```js
const YourContainerComponent = React.createClass({
	render() {
		return (
			<ReactTransitionGroup>
				{
					this.props.children && React.cloneElement(this.props.children, {
						key: this.props.location.pathname
					})
				}
			</ReactTransitionGroup>
		)
	}
});
```
see more in [demo code](test.html) shown above.
## Why it born
I found there's no handy plugin based on react-router to make this effect. I tried to use ReactCSSTransitionGroup to achieve this effect but failed. As a result...

## Thanks
I was inspired by this [article](http://coenraets.org/blog/2013/03/hardware-accelerated-page-transitions-for-mobile-web-apps-phonegap-apps/) which wrote by [
@ccoenraets](https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fcoenraets.org%2Fblog%2Fbio%2F&ref_src=twsrc%5Etfw&screen_name=ccoenraets&tw_p=followbutton).
Thanks for your great idea.
