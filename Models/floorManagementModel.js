const mongoose = require('mongoose');

// Amenities Schema
const amenitiesSchema = new mongoose.Schema({
    airConditioner: { type: Boolean, default: false },  // AC availability (Yes/No)
    geyser: { type: Boolean, default: false },          // Geyser availability (Yes/No)
    pricePerMonth: { type: Number, required: true },    // Price per month
    pricePerDay: { type: Number, required: true },      // Price per day
    photos: [{ type: String }]                          // Array of photo URLs (optional)
}, {
    _id: false  // Prevent creating separate IDs for amenities (since it's part of room info)
});

// Room Schema
const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },       // Room number
    amenities: [amenitiesSchema],                       // Array of amenities associated with the room
}, {
    _id: false  // Prevent creating separate IDs for rooms (since it's part of sharing)
});

// Sharing Schema (Single, Double, Triple, etc.)
const sharingSchema = new mongoose.Schema({
    sharingType: { type: String, required: true },      // Sharing type (e.g., Single, Double, Triple)
    noOfRooms: { type: Number, required: true },        // Total number of rooms for this sharing type
    noOfCots: { type: Number, required: true },         // Total number of cots per room in this sharing type
    rooms: [roomSchema],                                // Array of rooms under this sharing type
}, {
    _id: false  // Prevent creating separate IDs for sharing types (since it's part of floor management)
});

// Floor Management Schema
const floorManagementSchema = new mongoose.Schema({
    noOfFloors: { type: Number, required: true },       // Total number of floors
    floorNumber: { type: Number, required: true },      // Specific floor number
    sharings: [sharingSchema],   
    isDeleted: { type: Boolean, default: false }                        // Array of sharing types (Single, Double, etc.)
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const FloorManagement = mongoose.model('FloorManagement', floorManagementSchema);

module.exports = FloorManagement;
