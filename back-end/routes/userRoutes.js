const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        console.log("Received request to create user", req.body);
        
        const { name, password, email } = req.body; // 🔹 استلام البيانات من Postman

        if (!name || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log("Creating user:", { name, password, email });

        const newUser = new User({ name, password, email });
        await newUser.save();

        console.log("User saved successfully:", newUser);

        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
});



// 🔹 استرجاع جميع المستخدمين (Retrieve)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
});

// 🔹 تحديث بيانات المستخدم (Update)
router.put('/:id', async (req, res) => {
    try {
        const { name, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, password },
            { new: true }
        );
        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});

// 🔹 حذف المستخدم نهائيًا (Delete)
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

const mongoose = require('mongoose');

// 🔹 الحذف الناعم (Soft Delete)
router.put('/soft-delete/:id', async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id); // تأكد من إضافة `new` هنا
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(userId); // 🔥 تأكدي إن المستخدم موجود
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isDeleted = true;
        await user.save();

        res.status(200).json({ message: "User soft deleted successfully" });
    } catch (error) {
        console.error("Error soft deleting user:", error);
        res.status(500).json({ message: "Error soft deleting user", error: error.message });
    }
});



module.exports = router;
