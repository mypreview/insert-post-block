/**
 * Returns an object only with given path endings.
 */

/**
 * External dependencies
 */
import { forEach, split, get, set, first } from 'lodash';

const deepPick = ( collection, paths ) => {
	const picked = {};
	forEach( paths, ( path ) => set( picked, first( split( path, '.' ) ), get( collection, path ) ) );
	return picked;
};

export default deepPick;
