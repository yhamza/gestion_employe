const mongoose = require('mongoose');

// employé model
const employeSchema = new mongoose.Schema({
    id:{type:String,},
    name: { type: String, required: true ,},
    email: { type: String, required: true,unique: true,validate: { validator: value => /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value), message: "Invalid email address" } },
    gender: String,
    team: { type: String, required: true },
    role: { type: String, required: true, enum: ['DEVELOPER', 'PROJECT-MANAGER', 'HR']},
    birthDate: Date,
    position: String,
    recruitmentDate: Date,
    score: { type: Number, min: 0, max: 100 },
    project:[{type:String}],
    salary: {type:Number , min:0},
});

// Export employé model
const Employee = mongoose.model('Employee', employeSchema);
module.exports = Employee;
