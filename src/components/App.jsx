import React, { Component } from 'react';
import Keyakizaka46 from './Keyakizaka46';
import Camera from './Camera';
import autobind from 'autobind-decorator';
import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = { angle: 0 };
	}

	render() {
		const { state: { angle } } = this;

		return (
			<div styleName='base'>
				<div>
					<Camera onTimeUpdate={this.onTimeUpdate} />
				</div>
				<div styleName='keyaki'>
					<div styleName='logo'>
						<Keyakizaka46 angle={angle} />
					</div>
					<div styleName='value'>
						欅坂{angle}
					</div>
				</div>
			</div>
		);
	}

	/**
	 * @param {number} angle
	 */
	@autobind
	onTimeUpdate(angle) {
		this.setState({ angle });
	}
}

export default App;