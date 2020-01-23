/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { TextControl } = wp.components;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { select, withSelect, withDispatch } = wp.data;

var currentDate = new Date();
var currentYear = currentDate.getFullYear();

let IsbnControl = ({ isbn, onUpdateIsbn }) => (
    <TextControl
        label={ __( 'ISBN', 'gutenberg-book-post-type' ) }
        value={ isbn }
        onChange={ isbn => onUpdateIsbn( isbn ) }
    />
);

let PublicationYearControl = ({ publication_year, onUpdatePublicationYear }) => (
    <TextControl
        label={ __( 'Publication Year', 'gutenberg-book-post-type' ) }
        type='number'
        value={ publication_year ? publication_year : currentYear }
        min={ 1 }
        onChange={ publication_year => onUpdatePublicationYear( parseInt( publication_year ) ) }
    />
);

IsbnControl = compose( [
	withSelect( ( select ) => {
		return {
            isbn: select( 'core/editor' ).getEditedPostAttribute( 'meta' )['_book_isbn']
        };
	} ),
	withDispatch( ( dispatch ) => {
		return {
            onUpdateIsbn: ( value ) => {
                dispatch( 'core/editor' ).editPost({ meta: { _book_isbn: value } })
            }
        }
	} ),
] )( IsbnControl );


PublicationYearControl = compose( [
    withSelect( ( select ) => {
        return {
            publication_year: select( 'core/editor' ).getEditedPostAttribute( 'meta' )['_book_publication_year'],
        };
    } ),
    withDispatch( ( dispatch ) => {
        return {
            onUpdatePublicationYear: ( value ) => {
                dispatch( 'core/editor' ).editPost({ meta: { _book_publication_year: value } })
            }
        };
    } ),
] )( PublicationYearControl );

const BookDataPanel = () => {
    const postType = select( 'core/editor' ).getCurrentPostType();
    if ( 'book' !== postType ) {
        return null;
    }

    return (
        <PluginDocumentSettingPanel
            name='book-data'
            title={ __( 'Book Data', 'gutenberg-book-post-type' ) }
            className='book-data-panel'
        >
            <IsbnControl />
            <PublicationYearControl />
        </PluginDocumentSettingPanel>
    );
}

registerPlugin( 'book-data-panel', {
    icon: 'book',
    render: BookDataPanel,
})