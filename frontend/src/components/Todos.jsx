import { Todo } from './'

const Todos = ({ todos, searchTerm }) => {
	return (
		<div className='todos-wrapper'>
			{todos
				.filter(todo => {
					if (searchTerm === '') {
						return todo
					} else if (
						todo.title.toLowerCase().includes(searchTerm.toLowerCase())
					) {
						return todo
					}
					return false
				})
				.map(todo => (
					<Todo key={todo._id} todo={todo} />
				))}
		</div>
	)
}
export default Todos
