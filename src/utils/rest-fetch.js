/**
 * Utility to make WordPress REST API requests.
 */

/**
 * WordPress dependencies
 */
const { apiFetch } = wp;
const { addQueryArgs } = wp.url;

const restFetch = ( endpoint, args = { per_page: -1 } ) =>
	apiFetch( {
		path: addQueryArgs( `/wp/v2/${ endpoint }`, args ),
	} )
		.then( ( data ) => data )
		.catch( ( error ) => error );

export default restFetch;
