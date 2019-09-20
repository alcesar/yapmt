var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	description: { type: String, default: null },
	owner: { type: String, default: null },
	dueDate: { type: Date, default: Date.now },
	parentProject:  { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null, unique: true},
	isCompleted:  { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);