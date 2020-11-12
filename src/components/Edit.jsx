/**
 * External dependencies
 */
import { concat, chain, filter, map, mapKeys, pick, isArray, isEmpty } from 'lodash';
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
			return [];
		};

		hasPosts( postList ) {
			return ( isArray( postList ) && isEmpty( postList ) ) ?? true;
		}

		render() {
			const { isSelected, className, attributes, setAttributes } = this.props;
			const { type, id } = attributes;
			const postTypes = this.getPostTypes();

			return (
				<Fragment>
					<div className={ className }>
						{ ! this.hasPosts( postTypes ) ? (
							<Placeholder
								icon={ <Dashicon icon="admin-post" /> }
								className={ `${ SLUG }-placeholder` }
								label={ __( 'Post', 'insert-post-block' ) }
								instructions={ __(
									'Select a post to display from the dropdown menu below:',
									'insert-post-block'
								) }
							>
								<SelectControl
									label={ __( 'Post type:', 'insert-post-block' ) }
									options={ postTypes }
									onChange={ ( value ) => setAttributes( { type: value } ) }
									value={ type }
								/>
							</Placeholder>
						) : (
							<Notice status="error" isDismissible={ false }>
								{ __( 'No viewable post type found.', 'insert-post-block' ) }
							</Notice>
						) }
					</div>
				</Fragment>
			);
		}
	}
);
