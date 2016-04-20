(function() {
	const ReactDom = require('react-dom');

	const PageSlider = (options = {}) => {
		
		const defaultOptions = {
			default: 'page',
			active: 'active',
			right: 'page-right',
			center: 'page-center',
			left: 'page-left'
		};

		const pageStyles = Object.assign({}, defaultOptions, options);

		const ONTRANSITIONEND = window.ontransitionend !== undefined && 'transitionend' || 'webkitTransitionEnd';

		const keyHistory = [];

		let dir = 0;

		const slider = {

			componentWillAppear(cb) {

				keyHistory.push(this.props.location.key);

				let el = ReactDom.findDOMNode(this);

				el.className += ` ${pageStyles.right}`;

				requestAnimationFrame(() => {
					el.className += ` ${pageStyles.active} ${pageStyles.center}`;
				});

				const onAppearEnd = () => {
					el.removeEventListener(ONTRANSITIONEND, onAppearEnd);
					el.className = `page ${pageStyles.center}`;
					cb();
				};

				el.addEventListener(ONTRANSITIONEND, onAppearEnd);
			},

			componentWillEnter(cb) {

				let key = this.props.location.key,
					len = keyHistory.length; 
				if (key === keyHistory[len - 2]) {
					keyHistory.pop();
					dir = -1;
				} else {
					keyHistory.push(key);
					dir = 1;
				}

				const fromDir = dir === -1 ? pageStyles.left : pageStyles.right;

				let el = ReactDom.findDOMNode(this);

				el.className += ` ${fromDir}`;

				requestAnimationFrame(() => {
					el.className += ` ${pageStyles.active}`;
					requestAnimationFrame(() => {
						el.className += ` ${pageStyles.center}`;
					});
				});

				const onEnterEnd = () => {
					el.removeEventListener(ONTRANSITIONEND, onEnterEnd);
					el.className = `page ${pageStyles.center}`;
					cb();
				};

				el.addEventListener(ONTRANSITIONEND, onEnterEnd);
			},

			componentWillLeave(cb) {

				const toDir = dir === -1 ? pageStyles.right : pageStyles.left;

				let el = ReactDom.findDOMNode(this);

				el.className = pageStyles.default;

				requestAnimationFrame(() => {
					el.className += ` ${pageStyles.active}`;
					requestAnimationFrame(() => {
						el.className += ` ${toDir}`;
					});
				});

				const onLeaveEnd = () => {
					el.removeEventListener(ONTRANSITIONEND, onLeaveEnd);
					cb();
				};

				el.addEventListener(ONTRANSITIONEND, onLeaveEnd);
			}
		};

		return slider;
	};
	
	module.exports = PageSlider;
})();