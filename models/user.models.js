const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String }, // Changed require to required
    email: { type: String, required: true },
    pass: { type: String},
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    salary: { type: Number },
    date: { type: Date, default: Date.now }
}, {
    versionKey: false
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel,
};
