<?php
/**
 * The `Insert Post Block` bootstrap file.
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * Insert Post Block is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * @link                    https://www.mypreview.one
 * @since                   1.0.0
 * @package                 insert-post-block
 * @author                  MyPreview (Github: @mahdiyazdani, @mypreview)
 * @copyright               © 2015 - 2020 MyPreview. All Rights Reserved.
 *
 * @wordpress-plugin
 * Plugin Name:             Insert Post Block
 * Plugin URI:              https://www.mypreview.one
 * Description:             XXX.
 * Version:                 1.0.0
 * Requires at least:       WordPress 5.2
 * Requires PHP:            7.2.0
 * Author:                  MyPreview
 * Author URI:              https://mahdiyazdani.com
 * License:                 GPL-3.0
 * License URI:             http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:             insert-post-block
 * Domain Path:             /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	wp_die();
} // End If Statement

/**
 * Gets the path to a plugin file or directory.
 *
 * @see     https://codex.wordpress.org/Function_Reference/plugin_basename
 * @see     http://php.net/manual/en/language.constants.predefined.php
 */
$insert_post_block_plugin_data = get_file_data(
	__FILE__,
	array(
		'name'       => 'Plugin Name',
		'author_uri' => 'Author URI',
		'version'    => 'Version',
	),
	'plugin'
);
define( 'INSERT_POST_BLOCK_NAME', $insert_post_block_plugin_data['name'] );
define( 'INSERT_POST_BLOCK_VERSION', $insert_post_block_plugin_data['version'] );
define( 'INSERT_POST_BLOCK_AUTHOR_URI', $insert_post_block_plugin_data['author_uri'] );
define( 'INSERT_POST_BLOCK_SLUG', 'insert-post-block' );
define( 'INSERT_POST_BLOCK_PREFIX', 'insert_post_block' );
define( 'INSERT_POST_BLOCK_FILE', __FILE__ );
define( 'INSERT_POST_BLOCK_BASENAME', basename( INSERT_POST_BLOCK_FILE ) );
define( 'INSERT_POST_BLOCK_PLUGIN_BASENAME', plugin_basename( INSERT_POST_BLOCK_FILE ) );
define( 'INSERT_POST_BLOCK_DIR_URL', plugin_dir_url( INSERT_POST_BLOCK_FILE ) );
define( 'INSERT_POST_BLOCK_DIR_PATH', plugin_dir_path( INSERT_POST_BLOCK_FILE ) );

if ( ! class_exists( 'Insert_Post_Block' ) ) :

	/**
	 * The Insert Post Block - Class
	 */
	final class Insert_Post_Block {

		/**
		 * Instance of the class.
		 *
		 * @var  object   $instance
		 */
		private static $instance = null;

		/**
		 * Main `Insert_Post_Block` instance
		 * Ensures only one instance of `Insert_Post_Block` is loaded or can be loaded.
		 *
		 * @access   public
		 * @since    1.0.0
		 * @return   instance
		 */
		public static function instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			} // End If Statement

			return self::$instance;
		}

		/**
		 * Setup class.
		 *
		 * @access   protected
		 * @since    1.0.0
		 * @return   void
		 */
		protected function __construct() {
			add_action( 'init', array( $this, 'textdomain' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'editor_enqueue' ) );
			add_filter( sprintf( 'plugin_action_links_%s', INSERT_POST_BLOCK_PLUGIN_BASENAME ), array( $this, 'additional_links' ) );
		}

		/**
		 * Cloning instances of this class is forbidden.
		 *
		 * @access   protected
		 * @since    1.0.0
		 * @return   void
		 */
		protected function __clone() {
			_doing_it_wrong( __FUNCTION__, esc_html_x( 'Cloning instances of this class is forbidden.', 'clone', 'insert-post-block' ), esc_html( INSERT_POST_BLOCK_VERSION ) );
		}

		/**
		 * Unserializing instances of this class is forbidden.
		 *
		 * @access   public
		 * @since    1.0.0
		 * @return   void
		 */
		public function __wakeup() {
			_doing_it_wrong( __FUNCTION__, esc_html_x( 'Unserializing instances of this class is forbidden.', 'wakeup', 'insert-post-block' ), esc_html( INSERT_POST_BLOCK_VERSION ) );
		}

		/**
		 * Load languages file and text domains.
		 * Define the internationalization functionality.
		 *
		 * @access   public
		 * @since    1.0.0
		 * @return   void
		 */
		public function textdomain() {
			load_plugin_textdomain( 'insert-post-block', false, dirname( dirname( INSERT_POST_BLOCK_PLUGIN_BASENAME ) ) . '/languages/' );
		}

		/**
		 * Register the stylesheets and JavaScript for the Gutenberg (editor) side of the site.
		 *
		 * @access   public
		 * @since    1.0.0
		 * @return   void
		 */
		public function editor_enqueue() {
			$script_path       = sprintf( '%sdist/script.js', INSERT_POST_BLOCK_DIR_PATH );
			$script_asset_path = sprintf( '%sdist/script.asset.php', INSERT_POST_BLOCK_DIR_PATH );
			$script_asset      = file_exists( $script_asset_path ) ? require $script_asset_path : array(
				'dependencies' => array( 'wp-blocks', 'wp-dom-ready', 'lodash' ),
				'version'      => filemtime( $script_path ),
			);
			$script_url        = sprintf( '%sdist/script.js', INSERT_POST_BLOCK_DIR_URL );
			// Enqueue the script.
			wp_enqueue_script( INSERT_POST_BLOCK_SLUG, $script_url, $script_asset['dependencies'], $script_asset['version'], true );
			wp_set_script_translations( INSERT_POST_BLOCK_SLUG, 'insert-post-block', sprintf( '%s/languages/', INSERT_POST_BLOCK_DIR_PATH ) );
			wp_localize_script(
				INSERT_POST_BLOCK_SLUG,
				INSERT_POST_BLOCK_PREFIX,
				array(
					'author_uri'  => INSERT_POST_BLOCK_AUTHOR_URI,
				)
			);
		}

		/**
		 * Display additional links in plugins table page.
		 * Filters the list of action links displayed for a specific plugin in the Plugins list table.
		 *
		 * @access   public
		 * @since    1.0.0
		 * @param    array $links      An array of plugin action links.
		 * @return   array
		 */
		public function additional_links( $links ) {
			$plugin_links = array();
			/* translators: 1: Open anchor tag, 2: Close anchor tag. */
			$plugin_links[] = sprintf( _x( '%1$sHire Me!%2$s', 'plugin link', 'insert-post-block' ), sprintf( '<a href="%s" class="button-link-delete" target="_blank" rel="noopener noreferrer nofollow" title="%s">', esc_url( INSERT_POST_BLOCK_AUTHOR_URI ), esc_attr_x( 'Looking for help? Hire Me!', 'upsell', 'insert-post-block' ) ), '</a>' );
			/* translators: 1: Open anchor tag, 2: Close anchor tag. */
			$plugin_links[] = sprintf( _x( '%1$sSupport%2$s', 'plugin link', 'insert-post-block' ), sprintf( '<a href="https://wordpress.org/support/plugin/%s" target="_blank" rel="noopener noreferrer nofollow">', INSERT_POST_BLOCK_SLUG ), '</a>' );

			return array_merge( $plugin_links, $links );
		}

	}
endif;

if ( ! function_exists( 'insert_post_block_init' ) ) :

	/**
	 * Returns the main instance of Insert_Post_Block to prevent the need to use globals.
	 *
	 * @return  object(class)   Insert_Post_Block::instance
	 */
	function insert_post_block_init() {
		return Insert_Post_Block::instance();
	}

	insert_post_block_init();
endif;