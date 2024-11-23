const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    birthday: { type: Date, required: true },
    list_of_routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
    list_of_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }]
});

// Routine Schema
const routineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    list_of_exercise_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }] // Assuming Exercise is another collection
});

// Workout Schema
const workoutSchema = new mongoose.Schema({
    exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }, // Assuming Exercise is another collection
    exercise_name: { type: String, required: true },
    start_date_time: { type: Date, required: true },
    end_date_time: { type: Date, required: true },
    list_of_sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }]
});

// Set Schema
const setSchema = new mongoose.Schema({
    set_no: { type: Number, required: true },
    exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }, // Assuming Exercise is another collection
    weight: { type: Number, required: true },
    repetitions: { type: Number, required: true },
    notes: { type: String },
    previous_weight: { type: Number },
    previous_repetitions: { type: Number },
    previous_notes: { type: String }
});

// Log Schema
const logSchema = new mongoose.Schema({
    routine_obj: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine' },
    routine_name: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    date: { type: Date, required: true },
    list_of_workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]
});

// Create Models
const User = mongoose.model('User', userSchema);
const Routine = mongoose.model('Routine', routineSchema);
const Workout = mongoose.model('Workout', workoutSchema);
const Set = mongoose.model('Set', setSchema);
const Log = mongoose.model('Log', logSchema);

// Export Models
module.exports = {
    User,
    Routine,
    Workout,
    Set,
    Log
};
