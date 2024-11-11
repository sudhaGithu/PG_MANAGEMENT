const express = require('express');
const router = express.Router();
const Complaint = require('../Models/complaintModel');

// CREATE a new complaint for a specific hostler
const addComplaint = async (req, res) => {
    try {
        const { hostlerId } = req.params;
        const { roomNo, issue, status } = req.body;

        const newComplaint = new Complaint({
            hostlerId,
            roomNo,
            issue,
            status: status || 'pending' // default to 'pending' if not specified
        });

        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all complaints with status defaulting to "pending" if not specified
const getComplaints = async (req, res) => {
    try {
        const { status } = req.query;
        
        // Default to 'pending' if status is not provided
        const filter = { status: status || 'pending' };

        const complaints = await Complaint.find(filter);
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// READ a specific complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await Complaint.findById(id);

        if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
        res.json(complaint);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// UPDATE a complaint by ID for a specific hostler
const updateComplaint = async (req, res) => {
    try {
        const { hostlerId, id } = req.params;
        const updatedComplaint = await Complaint.findOneAndUpdate(
            { _id: id, hostlerId },
            req.body,
            { new: true }
        );

        if (!updatedComplaint) return res.status(404).json({ error: 'Complaint not found' });
        res.json(updatedComplaint);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a complaint by ID for a specific hostler
const deleteComplaint = async (req, res) => {
    try {
        const { hostlerId, id } = req.params;
        const deletedComplaint = await Complaint.findOneAndDelete({ _id: id, hostlerId });

        if (!deletedComplaint) return res.status(404).json({ error: 'Complaint not found' });
        res.json({ message: 'Complaint deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE status from 'pending' to 'resolved' for a specific complaint and hostler
const resolveComplaint = async (req, res) => {
    try {
        const { id } = req.params;

        const complaint = await Complaint.findOneAndUpdate(
            { _id: id, status: 'pending' },
            { status: 'resolved' },
            { new: true }
        );

        if (!complaint) return res.status(404).json({ error: 'Complaint not found or already resolved' });

        res.json({ message: 'Complaint status updated to resolved', complaint });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// READ all complaints with status "resolved"
const getResolvedComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ status: 'resolved' });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addComplaint,
    getComplaints,
    getComplaintById,
    updateComplaint,
    deleteComplaint,
    resolveComplaint,
    getResolvedComplaints
};
