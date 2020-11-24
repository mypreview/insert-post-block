/**
 * Generate options by mapping over array of objects.
 */

/**
 * External dependencies
 */
import { chain, map, concat, keys, mapKeys, first, split } from 'lodash'; /* eslint-disable-line no-unused-vars */
import renameKeys from 'rename-keys';
import deepPick from './deep-pick';
import optionNone from './option-none';

const generateOptions = ( query, optionKeys ) => {
	const cleanKeys = renameKeys( optionKeys, ( key ) => first( split( key, '.' ) ) ),
		options = chain( query )
			.map( ( post ) => deepPick( post, keys( optionKeys ) ) )
			.map( ( post ) => mapKeys( post, ( value, key ) => cleanKeys[ key ] ) )
			.value();
	return concat( optionNone, options );
};

export default generateOptions;
