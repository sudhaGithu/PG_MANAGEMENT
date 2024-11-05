const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostlerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  occupation: {
    type: String,
    enum: ['employee', 'student', 'other'],
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  identificationType: {
    type: String,
    enum: ['Aadhaar card', 'PAN card', 'Voter ID'],
    required: true,
  },
  images: {
    frontImage: String,
    backImage: String,
  },
  candidatePhoto: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Hostler', hostlerSchema);
