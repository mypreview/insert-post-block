/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, Component, RawHTML } = wp.element;
const { Placeholder, SelectControl, Dashicon, Notice, Spinner, Button, Disabled } = wp.components;
const { decodeEntities } = wp.htmlEntities;
const QUERY_ARGS = { per_page: -1 };

export default class Edit extends Component {
	render() {
		return (
			<Fragment>
				<div className={ className }>CONTENT</div>
			</Fragment>
		);
	}
}
