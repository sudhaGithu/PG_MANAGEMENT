const mongoose = require('mongoose');

// Menu Schema for each meal with an auto-generated _id
const mealSchema = new mongoose.Schema({
    items: [{ type: String, required: true }],  // List of food items in the meal
}, {
    _id: true // Allow for auto-generation of _id for each meal
});

// Day Schema (for each day of the week with an auto-generated _id)
const daySchema = new mongoose.Schema({
    day: { type: String, required: true },      // Name of the day (e.g., "monday", "tuesday")
    breakfast: { type: mealSchema, required: true }, // Menu for breakfast with _id
    lunch: { type: mealSchema, required: true },     // Menu for lunch with _id
    snacks: { type: mealSchema, required: true },    // Menu for snacks with _id
    dinner: { type: mealSchema, required: true }     // Menu for dinner with _id
}, {
    _id: true // Allow for auto-generation of _id for each day
});

// Food Management Schema (stores an array of days)
const foodManagementSchema = new mongoose.Schema({
    days: [{ type: daySchema, required: true }] // Array of day objects (each with its meals and ID)
}, {
    timestamps: true        // Automatically manage createdAt and updatedAt timestamps
});

const FoodManagement = mongoose.model('FoodManagement', foodManagementSchema);

module.exports = FoodManagement;
