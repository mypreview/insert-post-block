/**
 * External dependencies
 */
import { concat, chain, filter, map, mapKeys, pick } from 'lodash';
import classnames from 'classnames';
import restFetch from './../utils/rest-fetch';
import optionNone from './../utils/option-none';
import applyWithSelect from './../utils/with-select';
import { SLUG, PREFIX } from './../utils/prefix';

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

		// Filter and generate a list post-type select-options.
		getPostTypes = () => {
			const optionKeys = { slug: 'value', name: 'label' },
				{ postTypes } = this.props,
				typeList = chain( postTypes )
					.filter( 'viewable' )
					.map( ( post ) => pick( post, [ 'slug', 'name' ] ) )
					.map( ( post ) => mapKeys( post, ( value, key ) => optionKeys[ key ] ) )
					.value();
			return concat( optionNone, typeList );
		};

		render() {
			const { isSelected, className, attributes, setAttributes, postTypes } = this.props;
			const { type, id } = attributes;

			return (
				<Fragment>
					<div className={ className }>
						<Placeholder
							icon={ <Dashicon icon="admin-post" /> }
							className={ `${ SLUG }-placeholder` }
							label={ __( 'Post', 'kettler-extras' ) }
							instructions={ __(
								'Select a post to display from the dropdown menu below:',
								'insert-post-block'
							) }
						>
							<SelectControl
								label={ __( 'Post type:', 'insert-post-block' ) }
								options={ this.getPostTypes() }
								onChange={ ( value ) => setAttributes( { type: value } ) }
								value={ type }
							/>
						</Placeholder>
					</div>
				</Fragment>
			);
		}
	}
);
