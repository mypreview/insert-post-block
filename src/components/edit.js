/**
 * External dependencies
 */
import { filter, isEmpty, pick, isPlainObject, forEach } from 'lodash';
import classnames from 'classnames';
import ifArray from './../utils/if-array';
import restFetch from './../utils/rest-fetch';
import postTypes from './../utils/post-types';
import generateOptions from './../utils/generate-options';
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

class Edit extends Component {
	state = {
		typeQuery: [],
		postQuery: [],
		typeList: [],
		postList: [],
		isLoading: true,
	};

	componentDidMount() {
		const { type } = this.props.attributes;
		this.getTypes();
		this.getPosts( type );
	}

	// Filter and generate a list post-type select-options.
	getTypes = async () => {
		const query = await restFetch( 'types' );

		if ( isPlainObject( query ) ) {
			const typeQuery = pick( query, postTypes );
			this.setState( {
				typeQuery,
				typeList: generateOptions( typeQuery, { rest_base: 'value', name: 'label' } ),
			} );
		} else {
			this.clearOut( [ 'typeQuery', 'typeList' ] );
		}

		this.isLoading( false );
	};

	// Filter and generate a list post-type select-options.
	getPosts = async ( type ) => {
		const query = await restFetch( type );

		if ( ifArray( query ) ) {
			this.setState( {
				postQuery: query,
				postList: generateOptions( query, { id: 'value', 'title.rendered': 'label' } ),
			} );
		} else {
			this.clearOut( [ 'postQuery', 'postList' ] );
		}

		this.isLoading( false );
	};

	// Handle post-type control value change/update.
	onChangePostType = ( type ) => {
		const { setAttributes } = this.props;
		setAttributes( { type, id: '' } );

		if ( ! isEmpty( type ) ) {
			this.isLoading();
			this.getPosts( type );
		} else {
			this.clearOut( [ 'postQuery', 'postList' ] );
		}
	};

	// Toggle the state of loading.
	isLoading = ( isLoading = true ) => {
		this.setState( {
			isLoading,
		} );
	};

	// Set empty array for the given state keys.
	clearOut = ( args ) => {
		forEach( args, ( arg ) => {
			this.setState( {
				[ arg ]: [],
			} );
		} );
	};

	render() {
		const { typeList, postList, isLoading } = this.state,
			{ isSelected, className, attributes, setAttributes } = this.props,
			{ type, id } = attributes,
			hasTypeList = ifArray( typeList ),
			hasPostList = ifArray( postList );

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
						{ ( ! hasPostList || ! hasTypeList ) && !! isLoading ? (
							<Spinner />
						) : (
							<Fragment>
								{ ! hasTypeList && ! isLoading ? (
									<Notice status="warning" isDismissible={ false }>
										{ __( 'No post types found.', 'insert-post-block' ) }
									</Notice>
								) : (
									<Fragment>
										<SelectControl
											label={ __( 'Post type:', 'insert-post-block' ) }
											options={ typeList }
											onChange={ this.onChangePostType }
											value={ type }
										/>
										{ !! isLoading ? (
											<Spinner />
										) : (
											<SelectControl
												label={ __( 'Post:', 'insert-post-block' ) }
												options={ postList }
												onChange={ ( value ) => setAttributes( { id: value } ) }
												value={ id }
											/>
										) }
									</Fragment>
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
