/**
 * External dependencies
 */
import { filter, isEmpty } from 'lodash';
import classnames from 'classnames';
import ifArray from './../utils/if-array';
import restFetch from './../utils/rest-fetch';
import generateOptions from './../utils/generate-options';
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

class Edit extends Component {
	state = {
		typeQuery: [],
		typeList: [],
		isLoading: true,
	};

	componentDidMount() {
		this.getTypes();
	}

	// Filter and generate a list post-type select-options.
	getTypes = async () => {
		const typeQuery = await restFetch( 'types' );

		this.setState( {
			typeQuery,
			typeList: generateOptions( typeQuery, { slug: 'value', name: 'label' } ),
			isLoading: false,
		} );
	};

	isLoading = ( isLoading ) => {
		this.setState( {
			isLoading,
		} );
	};

	render() {
		const { typeList, isLoading } = this.state,
			{ isSelected, className, attributes, setAttributes } = this.props,
			{ type, id } = attributes,
			hasTypeList = ifArray( typeList );

		return (
			<Fragment>
				<div className={ className }>
					<Placeholder
						icon={ <Dashicon icon="admin-post" /> }
						className={ `${ SLUG }-placeholder` }
						label={ __( 'Post', 'insert-post-block' ) }
						instructions={ __(
							'Select a post to display from the dropdown menu below:',
							'insert-post-block'
						) }
					>
						{ ! hasTypeList && !! isLoading ? (
							<Spinner />
						) : (
							<Fragment>
								{ ! hasTypeList && ! isLoading ? (
									<Notice status="warning" isDismissible={ false }>
										{ __( 'No post types found.', 'insert-post-block' ) }
									</Notice>
								) : (
									<SelectControl
										label={ __( 'Post type:', 'insert-post-block' ) }
										options={ typeList }
										onChange={ ( value ) => setAttributes( { type: value } ) }
										value={ type }
									/>
								) }
							</Fragment>
						) }
					</Placeholder>
				</div>
			</Fragment>
		);
	}
}

export default compose( [ applyWithSelect ] )( Edit );
