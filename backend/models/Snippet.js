const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
		index: true
	},
	desc: {
		type: String
	},
	code: {
		type: String
	},
	dateMod: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateCreate: {
		type: Date,
		required: true,
		default: Date.now
	}
});
SnippetSchema.index({ name: 'text', desc: 'text' });

module.exports = Snippet = mongoose.model('snippet', SnippetSchema);