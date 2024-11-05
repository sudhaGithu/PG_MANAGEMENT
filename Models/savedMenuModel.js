const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    day: { type: String, required: true, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    meals: [
        {
            mealType: { type: String, required: true, enum: ['breakfast', 'lunch', 'snacks', 'dinner'] },
            items: { type: [String], required: true }
        }
    ]
});

const MenuSchema = new Schema({
    days: [DaySchema]
}, { timestamps: true });

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
