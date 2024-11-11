const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    hostlerId: { type: String, required: true },
    roomNo: { type: String, required: true },
    issue: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'resolved'], default: 'pending' }
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;
