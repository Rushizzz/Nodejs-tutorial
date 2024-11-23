const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    job_titile: {
        type: String,
    }
},
{ timestamps: true })

//creating actual model
const User = mongoose.model('user', userSchema);

module.exports = User;
