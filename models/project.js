const mongoose = require('mongoose');
// project model
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    repo: { type: String, validate: { validator: value => value ? /^https?:\/\/\S+$/.test(value) : true, message: "Invalid URL" } }
});

// Export  project model
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
