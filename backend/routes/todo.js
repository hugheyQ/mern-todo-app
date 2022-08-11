const router = require('express').Router()
const {
	getTodos,
	createTodo,
	updateTodo,
	deleteTodo,
} = require('../controllers/todo')

// Fetch all todos
router.get('/', getTodos)

// Create todo
router.post('/', createTodo)

// Update todo
router.patch('/:id', updateTodo)

// Delete todo
router.delete('/:id', deleteTodo)

module.exports = router
