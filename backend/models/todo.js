const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Title required'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Description required'],
			trim: true,
		},
		completed: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)
