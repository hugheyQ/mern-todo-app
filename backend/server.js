const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const todoRoutes = require('./routes/todo')
const { errorHandler } = require('./middleware/error')
const port = process.env.SERVER_PORT || 5000

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/todos', todoRoutes)

// Error handler
app.use(errorHandler)

// Database connection and server startup
mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log('Connected to DB')
		app.listen(port, () =>
			console.log(`Server running on port ${port}`)
		)
	})
	.catch(err => console.log(err.message))
