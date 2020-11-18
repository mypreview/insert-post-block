/**
 * External dependencies
 */
import { eq, map, get, filter, isEmpty, isUndefined, pick, isPlainObject, forEach, set, trim, parseInt } from 'lodash';
import classnames from 'classnames';
import Controls from './controls';
import ifArray from './utils/if-array';
import restFetch from './utils/rest-fetch';
import postTypes from './utils/post-types';
import generateOptions from './utils/generate-options';
import applyWithSelect from './utils/with-select';
import { PREFIX } from './utils/prefix';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component, RawHTML } = wp.element;
const { compose } = wp.compose;
const { Placeholder, SelectControl, Dashicon, Notice, Spinner, Button, Disabled } = wp.components;
const { decodeEntities } = wp.htmlEntities;
const QUERY_ARGS = { per_page: -1 };

class Edit extends Component {
	state = {
		typeQuery: [],
		postQuery: [],
		typeList: [],
		postList: [],
		isLoading: true,
		isSelecting: true,
		errorMsg: '',
	};

	componentDidMount() {
		const { type, id } = this.props.attributes;
		this.getTypes();

		if ( ! isEmpty( id ) ) {
			this.fetchPosts( type, id );
			this.isSelecting( false );
		}
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
	getPosts = async ( type, postId ) => {
		if ( ! isUndefined( postId ) ) {
			set( QUERY_ARGS, 'include', postId );
		}

		const query = await restFetch( type, QUERY_ARGS );

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

	// Request for fetching posts from the API.
	fetchPosts = ( type, postId = '' ) => {
		this.isLoading();
		this.getPosts( type, postId );
		this.isSelecting( true );
	};

	// Handle post-type control value change/update.
	onChangePostType = ( type ) => {
		const { setAttributes } = this.props;
		setAttributes( { type, id: '' } );

		if ( ! isEmpty( type ) ) {
			this.fetchPosts( type );
		} else {
			this.clearOut( [ 'postQuery', 'postList' ] );
		}
	};

	// Remove the `Placeholder` component from the view on `Submit`.
	onSubmit = () => {
		const { id } = this.props.attributes;
		if ( ! isEmpty( id ) ) {
			this.setState( {
				isSelecting: false,
				errorMsg: '',
			} );
		} else {
			this.setState( {
				errorMsg: __( 'Error: No post is selected!', 'insert-post-block' ),
			} );
		}
	};

	// Create a query to loop through and display results.
	displayQuery = ( postId, postQuery ) => {
		return filter( postQuery, ( post ) => eq( post.id, parseInt( postId ) ) );
	};

	// Toggle the state of post selecting.
	isSelecting = ( isSelecting = false ) => {
		this.setState( {
			isSelecting,
		} );
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
		const { typeList, postList, postQuery, isLoading, isSelecting, errorMsg } = this.state,
			{ isSelected, className, attributes, setAttributes } = this.props,
			{ type, id } = attributes,
			wpQuery = this.displayQuery( id, postQuery ),
			hasTypeList = ifArray( typeList ),
			hasPostList = ifArray( postList ),
			hasError = ! isEmpty( errorMsg );

		return (
			<Fragment>
				<div className={ className }>
					{ !! isSelecting ? (
						<Placeholder
							icon={ <Dashicon icon="admin-post" /> }
							className={ `${ PREFIX }-placeholder` }
							label={ __( 'Post', 'insert-post-block' ) }
							instructions={ __(
								'Select a post to display from the dropdown menu below:',
								'insert-post-block'
							) }
						>
							{ !! hasError && (
								<Notice status="error" isDismissible={ false }>
									{ errorMsg }
								</Notice>
							) }
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
												<Fragment>
													<SelectControl
														label={ __( 'Post:', 'insert-post-block' ) }
														options={ postList }
														onChange={ ( value ) => setAttributes( { id: value } ) }
														value={ id }
													/>
													<Button
														isPrimary={ true }
														onClick={ this.onSubmit }
														disabled={ ! ( !! hasPostList && !! hasTypeList ) }
													>
														{ __( 'Submit', 'insert-post-block' ) }
													</Button>
												</Fragment>
											) }
										</Fragment>
									) }
								</Fragment>
							) }
						</Placeholder>
					) : (
						<Fragment>
							{ ! hasPostList && !! isLoading ? (
								<p>
									{ __( 'Fetching post…', 'insert-post-block' ) }
									<Spinner />
								</p>
							) : (
								<Fragment>
									{ !! hasPostList ? (
										<Disabled>
											{ isSelected && (
												<Controls
													{ ...this.props }
													type={ type }
													fetchPosts={ this.fetchPosts }
												/>
											) }
											{ ifArray( wpQuery ) ? (
												map( wpQuery, ( post ) => (
													<div
														id={ sprintf( '%s-%s', type, get( post, id ) ) }
														className={ classnames(
															sprintf( '%s-item', type ),
															type,
															'hentry'
														) }
													>
														<RawHTML>
															{ decodeEntities(
																trim( get( post, 'content.rendered' ) )
															) || __( '(no content)', 'insert-post-block' ) }
														</RawHTML>
													</div>
												) )
											) : (
												<Notice status="error" isDismissible={ false }>
													{ __(
														'It seems this post has been deleted or not available to query at the moment.',
														'insert-post-block'
													) }
												</Notice>
											) }
										</Disabled>
									) : (
										<Notice status="error" isDismissible={ false }>
											{ __( 'No post to display.', 'insert-post-block' ) }
										</Notice>
									) }
								</Fragment>
							) }
						</Fragment>
					) }
				</div>
			</Fragment>
		);
	}
}

export default compose( [ applyWithSelect ] )( Edit );
