<?php
/**
 * Reusable blocks REST API: WP_REST_Blocks_Controller class
 *
 * @link       https://mahdiyazdani.com
 * @author     MyPreview (Github: @mahdiyazdani, @mypreview)
 *
 * @since      1.0.0
 * @package    Insert_Post_Block
 * @subpackage Insert_Post_Block/includes
 */

/**
 * Controller which provides a REST endpoint for the editor to read, create,
 * edit and delete reusable blocks. Blocks are stored as posts with the wp_block
 * post type.
 *
 * @since      1.0.0
 * @package    Insert_Post_Block
 * @subpackage Insert_Post_Block/includes
 * @author     MyPreview (Github: @mahdiyazdani, @mypreview)
 */
class Insert_Post_Block_Reusable_Controller extends WP_REST_Blocks_Controller {

	/**
	 * Filters a response based on the context defined in the schema.
	 *
	 * @access   public
	 * @since    1.0.0
	 * @param    array  $data       Response data to fiter.
	 * @param    string $context    Context defined in the schema.
	 * @return   array
	 */
	public function filter_response_by_context( $data, $context ) {
		$data = parent::filter_response_by_context( $data, $context );

		/*
		 * Add back the `title.rendered` and `content.rendered` from the response.
		 * As in our case these data removed by core, is needed to render a reusable
		 * block post, and have it displayed within the editor.
		 */

		$data['title']['rendered']   = wp_kses_post( get_the_title( $data['id'] ) );
		$data['content']['rendered'] = apply_filters( 'the_content', $data['content']['raw'] ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound

		return $data;
	}

} // End class.
