import { useEffect } from 'react'
import { useState } from 'react'
import { Search, Todos, AddTodo } from '../components'

const HomePage = () => {
	const [todos, setTodos] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [open, setOpen] = useState(false)

	const fetchTodos = async () => {
		const response = await fetch('todos/')
		if (response.ok) {
			const todos = await response.json()

			setTodos(todos)
		}
	}

	useEffect(() => {
		fetchTodos()
	}, [todos])

	return (
		<div className={`wrapper ${open ? 'open' : ''}`}>
			<div className='inner-wrapper'>
				<AddTodo setOpen={setOpen} />
				<Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

				<button className='add-todo' onClick={() => setOpen(true)}>
					ADD TODO
				</button>

				{todos.length > 0 ? (
					<Todos todos={todos} searchTerm={searchTerm} />
				) : (
					'There are no todos at this moment.'
				)}
			</div>
		</div>
	)
}
export default HomePage
