/**
 * Determines whether the variable is a valid array and has at least one item within it.
 */

/**
 * External dependencies
 */
import isArray from 'lodash/isArray';

const ifArray = ( arr ) => {
	return isArray( arr ) && arr && arr.length ? true : false;
};

export default ifArray;
