/**
 * Text to display for the 'no posts' option.
 */

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;

const optionNone = [
	{
		/* translators: 1: HTML long dash. */
		label: sprintf( __( '%1$s Select %1$s', 'insert-post-block' ), '—' ),
		value: '',
	},
];

export default optionNone;
