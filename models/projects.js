var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	name: { type: String, default: null },
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null}],
});

module.exports = mongoose.model('Project', ProjectSchema);
