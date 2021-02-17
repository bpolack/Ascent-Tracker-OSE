const mongoose = require('mongoose');
const moment = require('moment');

let hourFromNow = function(){
    return moment().add(1, 'hour');
};

const TimeSchema = new mongoose.Schema({
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
    project: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'project',
        default: null
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true,
        default: hourFromNow
    },
    desc: {
        type: String
    },
    refLink: {
        type: String
    }
});
TimeSchema.index({ name: 'text', desc: 'text' });

module.exports = Time = mongoose.model('time', TimeSchema);