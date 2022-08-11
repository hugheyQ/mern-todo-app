const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Todo = require('../models/todo')

const createTodo = asyncHandler(async (req, res) => {
	const { title, description } = req.body

	if (!title || !description) {
		res.status(400)
		throw Error('All fields are required')
	}

	const todo = await Todo.create(req.body)

	if (todo) {
		res.status(201).json(todo)
	}
})

const getTodos = asyncHandler(async (req, res) => {
	const todos = await Todo.find()
	res.status(200).json(todos)
})

const updateTodo = asyncHandler(async (req, res) => {
	const { id } = req.params

	const validID = mongoose.Types.ObjectId.isValid(id)

	if (!validID) {
		res.status(400)
		throw Error('Todo ID provided invalid.')
	}

	const todo = await Todo.findOneAndUpdate({ _id: id }, req.body, {
		new: true,
	})

	if (!todo) {
		res.status(400)
		throw Error('Todo does not exist.')
	}

	res.status(200).json({ todo })
})

const deleteTodo = asyncHandler(async (req, res) => {
	const { id } = req.params

	const validID = mongoose.Types.ObjectId.isValid(id)

	if (!validID) {
		res.status(400)
		throw Error('Todo ID provided invalid.')
	}

	const todo = await Todo.findOneAndDelete({ _id: id })

	if (!todo) {
		res.status(404)
		throw Error('Todo does not exist.')
	}

	res.status(200).json({ message: 'Todo deleted successfully.' })
})

module.exports = {
	createTodo,
	getTodos,
	updateTodo,
	deleteTodo,
}
