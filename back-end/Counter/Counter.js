const mongoose = require('mongoose');

// تعريف نموذج العداد
const counterSchema = new mongoose.Schema({
    model: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
