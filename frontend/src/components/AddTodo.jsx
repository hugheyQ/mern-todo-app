import { useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineClose } from 'react-icons/ai'

const AddTodo = ({ setOpen }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
	})

	const { title, description } = formData

	const handleChange = e => {
		const { name, value } = e.target

		setFormData(prev => {
			return { ...prev, [name]: value }
		})
	}
	const handleSubmit = e => {
		e.preventDefault()

		fetch('todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then(res => res.json())
			.then(() => {
				setOpen(false)
				toast.success('Todo added successfully.')
			})
			.catch(() => toast.error('Todo could not be created.'))

		setFormData({
			title: '',
			description: '',
		})
	}

	return (
		<div className='add-todo-wrapper'>
			<h2>Add Todo</h2>
			<span className='close-btn' onClick={() => setOpen(false)}>
				<AiOutlineClose />
			</span>

			<form onSubmit={handleSubmit}>
				<div className='input-group'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						name='title'
						placeholder='Title'
						value={title}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='input-group'>
					<label htmlFor='description'>Description</label>
					<textarea
						name='description'
						id='description'
						placeholder='Description'
						value={description}
						onChange={handleChange}
						required
					></textarea>
				</div>

				<button type='submit'>Add</button>
			</form>
		</div>
	)
}
export default AddTodo
