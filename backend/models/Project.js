const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
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
ProjectSchema.index({ name: 'text', desc: 'text' });

module.exports = Project = mongoose.model('project', ProjectSchema);