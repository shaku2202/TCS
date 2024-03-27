const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { access } = require('../middleware/access.middleware');
const { UserModel } = require('../models/user.models');

const employeeRouter = express.Router();

// Add an employee (Admin only)
employeeRouter.post('/add', auth, access(["Admin"]), async (req, res) => {
    const { name, lastname,email, salary } = req.body;
    try {
        const user = new UserModel({ name, lastname, email, salary });
        await user.save();
        res.status(200).json({ msg: "Employee added successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete an employee (Admin only)
employeeRouter.delete('/delete/:id', auth, access(["Admin"]), async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update an employee (Admin only)
employeeRouter.patch('/update/:id', auth, access(["Admin"]), async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await UserModel.findByIdAndUpdate(id, payload);
        res.status(200).json({ msg: "Employee updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


employeeRouter.get('/all', auth, access(["Admin"]), async (req, res) => {
    try {
        const { page = 1, limit = 10, salary, name } = req.query;
        const query = { role: "User" }; // Assuming "User" role is for employees

        // Apply filtering based on salary
        if (salary) {
            query.salary = { $gte: salary }; // Filter employees with salary greater than or equal to the provided value
        }

        // Apply searching based on name
        if (name) {
            query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search by name
        }

        // Execute query with pagination
        const employees = await UserModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({ employees });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = {
    employeeRouter,
};
