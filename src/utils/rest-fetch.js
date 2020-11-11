/**
 * Utility to make WordPress REST API requests.
 */

/**
 * WordPress dependencies
 */
const { apiFetch } = wp;

const restFetch = ( args ) =>
	apiFetch( args )
		.then( ( data ) => data )
		.catch( ( error ) => error );

export default restFetch;
