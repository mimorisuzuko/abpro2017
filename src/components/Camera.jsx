import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import autobind from 'autobind-decorator';
import LSD from '../imageprocessing-labs/cv/lsd/src/lsd';
import getQuery from '../query';
import filter from 'lodash/filter';
import meanBy from 'lodash/meanby';
import slice from 'lodash/slice';

class Camera extends PureComponent {
	constructor() {
		super();

		/** @type {CanvasRenderingContext2D} */
		this.ctx = null;
		/** @type {HTMLVideoElement} */
		this.$video = null;
		this.width = 0;
		this.height = 0;
	}

	render() {
		return <canvas style={{ display: getQuery('debug') ? 'block' : 'none' }} />;
	}

	componentDidMount() {
		navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
			const $video = document.createElement('video');

			$video.addEventListener('loadedmetadata', () => {
				const { videoWidth, videoHeight } = $video;
				const $canvas = findDOMNode(this);

				$canvas.width = videoWidth;
				$canvas.height = videoHeight;
				this.ctx = $canvas.getContext('2d');
				this.$video = $video;
				this.width = videoWidth;
				this.height = videoHeight;
				this.onTimeUpdate();
			});
			$video.src = URL.createObjectURL(stream);
		}).catch(console.error);
	}

	@autobind
	onTimeUpdate() {
		const { ctx, $video, width, height, props: { onTimeUpdate } } = this;
		const detector = new LSD();
		let angle = null;

		ctx.drawImage($video, 0, 0);

		let lines = filter(detector.detect(ctx.getImageData(0, 0, width, height)), ({ x1, y1, x2, y2 }) => {
			const dx = x2 - x1;
			const dy = y2 - y1;

			return Math.abs(dy / dx) < 0.01 && Math.abs(dx) > 300;
		});
		const { length } = lines;

		if (length === 2 || length === 3) {
			const { y1: a, y2: b } = lines[0];
			const { y1: c, y2: d } = lines[1];

			if ((c + d) / 2 - (a + b) / 2 > 5) {
				lines = slice(lines, 1);
			}
		}

		const y = meanBy(lines, ({ y1, y2 }) => (y1 + y2) / 2);

		if (y) {
			angle = 0.1404 * y - 9.3738;
		}

		if (typeof onTimeUpdate === 'function') {
			onTimeUpdate(Math.floor(angle === null ? 0 : angle));
		}

		requestAnimationFrame(this.onTimeUpdate);
	}
}

export default Camera;