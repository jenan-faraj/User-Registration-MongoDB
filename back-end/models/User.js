const mongoose = require('mongoose');
const Counter = require('../Counter/Counter');  // استيراد الـ Counter

const userSchema = new mongoose.Schema({ // رقم المستخدم المتسلسل
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false }
});

// قبل إضافة المستخدم الجديد، ننشئ رقم الـ ID المخصص
userSchema.pre('save', async function (next) {
    const user = this;
    const counter = await Counter.findOneAndUpdate(
        { model: 'users' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    user.user_id = counter.sequence_value;  // تعيين الرقم التسلسلي للمستخدم
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
