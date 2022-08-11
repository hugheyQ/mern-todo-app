const Search = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className='search-wrapper'>
			<input
				type='text'
				placeholder='Search todos...'
				name='search'
				onChange={e => setSearchTerm(e.target.value)}
				value={searchTerm}
			/>
		</div>
	)
}
export default Search
