<?php
/**
 * Dolineo Cennik
 *
 * @package       DOLINEO
 * @author        Softgorillas
 * @version       1.2.0
 *
 * @wordpress-plugin
 * Plugin Name:   Dolineo Cennik
 * Description:   Dolineo Cennik / Vue.js
 * Version:       1.2.0
 * Author:        Softgorillas
 * Author URI:    softgorillas.com/hire-us/
 * Text Domain:   dolineo-cennik
 * Domain Path:   /languages
 */


function load_vuescripts() {
    wp_enqueue_style( 'vue_wp_styles', plugin_dir_url( __FILE__ ) . 'dist/my-assets/css/app.css' );
    wp_enqueue_style( 'additional-wp-styles', plugin_dir_url( __FILE__ ) . 'style.css' );
    wp_register_script( 'vue_wp_compiled', plugin_dir_url( __FILE__ ) . 'dist/js/app.min.js', true );
    wp_register_script( 'vue_wp_dependencies', plugin_dir_url( __FILE__ ) . 'dist/js/chunk-vendors.min.js', true );
}
 
add_action( 'wp_enqueue_scripts', 'load_vuescripts' );
 
function attach_vue() {
    wp_enqueue_script( 'vue_wp_compiled' );
    wp_enqueue_script( 'vue_wp_dependencies' );
 
    return "<div id='app'></div>";
}
 
add_shortcode( 'dolineo-cennik', 'attach_vue' );
?>