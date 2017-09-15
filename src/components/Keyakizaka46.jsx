import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';

class Keyakizaka46 extends PureComponent {
	constructor() {
		super();

		this.state = { svgWidth: 0, svgHeight: 0 };
		/** @type {SVGGElement} */
		this.$g = null;
	}

	render() {
		const { state: { svgWidth, svgHeight } } = this;
		const { props: { angle } } = this;
		let green = 'rgb(94, 185, 84)';
		let purple = 'rgb(178, 100, 162)';

		if (angle !== 46) {
			green = 'rgb(158, 158, 158)';
			purple = 'rgb(121, 121, 121)';
		}

		const tan = Math.tan(angle / 180 * Math.PI);
		const width = 269.8;
		const height = tan * width;
		const dx = 28.5;
		const dy = 26.8;
		const dw = 19.6;
		const dh = 18.4;

		return (
			<svg style={{ display: 'inline-block', width: svgWidth, height: svgHeight }}>
				<g>
					{angle > 0 ? [
						<polygon points={`0,${height} ${width},${height} ${width},0`} fill={green} />,
						<polygon points={`${dx + width - dw},${dy + tan * dw} ${dx + width - dw},${dy + height - dh} ${dx + dh / tan},${dy + height - dh} ${dx},${dy + height} ${dx + width},${dy + height} ${dx + width},${dy}`} fill={purple} />
					] : null}
				</g>
			</svg>
		);
	}

	componentDidMount() {
		this.$g = findDOMNode(this).querySelector('g');
		this.setSize();
	}

	componentDidUpdate() {
		this.setSize();
	}

	setSize() {
		const { $g } = this;
		const { width, height } = $g.getBoundingClientRect();

		this.setState({ svgWidth: width, svgHeight: height });
	}
}

export default Keyakizaka46;