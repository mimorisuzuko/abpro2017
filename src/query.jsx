import qs from 'querystring';

const parsed = qs.parse(location.search.substring(1));
const query = {};

Object.keys(parsed).forEach((k) => {
	const v = parsed[k];

	query[k] = v === '' ? true : v;
});

/**
 * @param {string} key
 * @returns {any}
 */
export default (key) => query.hasOwnProperty(key) ? query[key] : false;