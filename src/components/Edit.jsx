/**
 * External dependencies
 */
import classnames from 'classnames';
import restFetch from './../utils/rest-fetch';
import applyWithSelect from './../utils/with-select';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, Component, RawHTML } = wp.element;
const { compose } = wp.compose;
const { Placeholder, SelectControl, Dashicon, Notice, Spinner, Button, Disabled } = wp.components;
const { decodeEntities } = wp.htmlEntities;
const QUERY_ARGS = { per_page: -1 };

export default compose( applyWithSelect )(
	class Edit extends Component {
		componentDidMount() {
			this.getPosts();
		}

		getPosts = async () => {};

		render() {
			const { isSelected, className, attributes } = this.props;

			return (
				<Fragment>
					<div className={ className }>AA</div>
				</Fragment>
			);
		}
	}
);
