import { useState } from 'react'
import { AiOutlineDelete, AiOutlineDown } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Todo = ({ todo }) => {
	const [expanded, setExpanded] = useState(false)
	const [todoData, setTodoData] = useState({
		title: todo.title,
		description: todo.description,
		completed: todo.completed,
	})

	const { title, description, completed } = todoData

	const handleChecked = () => {
		setTodoData(prev => {
			return { ...prev, completed: !completed }
		})

		fetch(`todos/${todo._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...todoData, completed: !completed }),
		})
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err))
	}

	const handleChange = e => {
		const { name, value } = e.target

		setTodoData(prev => {
			return { ...prev, [name]: value }
		})
	}

	const saveTodo = () => {
		if (title !== '' && description !== '') {
			fetch(`todos/${todo._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todoData),
			})
				.then(res => res.json())
				.then(data => console.log(data))
				.catch(err => console.log(err))
		}
	}

	const deleteTodo = () => {
		if (window.confirm('Are you sure you want to delete this todo?')) {
			fetch(`todos/${todo._id}`, {
				method: 'DELETE',
			})
				.then(res => res.json())
				.then(() => toast.success('Todo deleted successfully.'))
				.catch(err => console.log(err))
		}
	}

	return (
		<div
			className={`todo ${expanded ? 'expanded' : ''} ${
				completed ? 'completed' : ''
			}`}
		>
			<div className='todo-header'>
				<span className='todo-title-wrapper'>
					<input
						type='checkbox'
						defaultChecked={completed}
						onClick={handleChecked}
						name='completed'
					/>
					<input
						type='text'
						className='todo-title'
						value={title}
						onChange={handleChange}
						name='title'
						onBlur={saveTodo}
						readOnly={completed}
					/>
				</span>
				<span
					className='expand-todo'
					onClick={() => setExpanded(!expanded)}
				>
					<AiOutlineDown />
				</span>
			</div>

			<div className='todo-body'>
				<textarea
					onChange={handleChange}
					value={description}
					name='description'
					onBlur={saveTodo}
					readOnly={completed}
				></textarea>
				<span className='delete-todo' onClick={deleteTodo}>
					<AiOutlineDelete />
				</span>
			</div>
		</div>
	)
}
export default Todo
