<?php
/*
  Plugin Name: Gutenberg Book Post Type
  Plugin URI: 
  Description: An example on how to add Gutenberg support to a custom post type
  Version: 1.0
  Author: Oscar Ciutat
  Author URI: http://oscarciutat.com/code/
  Text Domain: gutenberg-book-post-type
  License: GPLv2 or later

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as 
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class Gutenberg_Book_Post_Type {

    /**
     * Plugin instance.
     *
     * @since 1.0
     *
     */
    protected static $instance = null;


    /**
     * Access this plugin’s working instance
     *
     * @since 1.0
     *
     */
    public static function get_instance() {
        
        if ( !self::$instance ) {
            self::$instance = new self;
        }

        return self::$instance;

    }

    
    /**
     * Used for regular plugin work.
     *
     * @since 1.0
     *
     */
    public function plugin_setup() {

        $this->includes();

        add_action( 'init', array( $this, 'load_language' ) );
        add_action( 'init', array( $this, 'register_custom_type' ) );
        add_action( 'init', array( $this, 'register_meta_fields' ) );

        add_action( 'enqueue_block_editor_assets', array( $this,  'enqueue_block_editor_assets' ) );

    }

    
    /**
     * Constructor. Intentionally left empty and public.
     *
     * @since 1.0
     *
     */
    public function __construct() {}
    
    
     /**
     * Includes required core files used in admin and on the frontend.
     *
     * @since 1.0
     *
     */
    protected function includes() {}


    /**
     * Loads language
     *
     * @since 1.0
     *
     */
    function load_language() {
        load_plugin_textdomain( 'gutenberg-book-post-type', '', dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }


    /**
     * Enqueues block editor assets
     *
     * @since 1.0
     *
     */
    function enqueue_block_editor_assets() {

        // Load scripts
        wp_enqueue_script(
            'gutenberg-book-post-type',
            plugins_url( 'build/index.js', __FILE__ ),
            array( 'wp-blocks', 'wp-components', 'wp-edit-post', 'wp-element', 'wp-i18n', 'wp-plugins' ),
            filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
        );

        // Translate scripts
        wp_set_script_translations( 'gutenberg-book-post-type', 'gutenberg-book-post-type', plugin_dir_path( __FILE__ ) . 'languages' );

    }

    /**
     * Registers custom post type
     *
     * @since 1.0
     *
     */
    function register_custom_type() {

        $labels = array(
            'name' => __( 'Books', 'gutenberg-book-post-type' ),
            'singular_name' => __( 'Book', 'gutenberg-book-post-type' ),
            'add_new' => __( 'Add New Book', 'gutenberg-book-post-type' ),
            'add_new_item' => __( 'Add New Book', 'gutenberg-book-post-type' ),
            'edit_item' => __( 'Edit Book', 'gutenberg-book-post-type' ),
            'new_item' => __( 'New Book', 'gutenberg-book-post-type' ),
            'view_item' => __( 'View Book', 'gutenberg-book-post-type' ),
            'search_items' => __( 'Search Books', 'gutenberg-book-post-type' ),
            'not_found' => __( 'No Books found', 'gutenberg-book-post-type' ),
            'not_found_in_trash' => __( 'No Books found in Trash', 'gutenberg-book-post-type' )
        );
      
        $args = array(
            'show_ui' => true,
            'show_in_rest' => true,
            'public' => true,
            'labels' => $labels,
            'menu_position' => 5,
            'menu_icon' => 'dashicons-book',
            'supports' => array( 'title', 'editor', 'comments', 'custom-fields', 'thumbnail' ), 
            'rewrite' => true,
            'has_archive' => 'books'
        );

        register_post_type( 'book', $args );
    }


    /**
     * Registers meta fields
     *
     * @since 1.0
     *
     */
    function register_meta_fields() {
        register_post_meta( 'book', '_book_isbn', array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
            'auth_callback' => function() {
                return current_user_can( 'edit_posts' );
            }
        ) );

        register_post_meta( 'book', '_book_publication_year', array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'number',
            'auth_callback' => function() {
                return current_user_can( 'edit_posts' );
            }
        ) );

    }


}

add_action( 'plugins_loaded', array ( Gutenberg_Book_Post_Type::get_instance(), 'plugin_setup' ) );
