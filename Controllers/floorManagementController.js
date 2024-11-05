const FloorManagement = require('../Models/floorManagementModel'); // Adjust the path as necessary

// Create a new Floor Management entry
const createFloorManagement = async (req, res) => {
    try {
        const floorManagement = new FloorManagement(req.body);
        await floorManagement.save();
        res.status(201).json({status : true , message: 'Floor Management created successfully', data: floorManagement });
    } catch (error) {
        res.status(400).json({ status : false, message: 'Error creating Floor Management', error });
    }
};

// Get all Floor Management entries
const getAllFloorManagement = async (req, res) => {
    try {
        const floorManagements = await FloorManagement.find({ isDeleted: false }); // Only get non-deleted entries
        res.status(200).json({status : true ,data :floorManagements});
    } catch (error) {
        res.status(500).json({status : false, message: 'Error retrieving Floor Managements', error });
    }
};


// Get all Floor Management entries
const getFloorManagement = async (req, res) => {
    try {
        const { id } = req.params;
        const floorManagements = await FloorManagement.find({_id: id, isDeleted: false }); // Only get non-deleted entries
        res.status(200).json({status : true, data :floorManagements});
    } catch (error) {
        res.status(500).json({status : false, message: 'Error retrieving Floor Managements', error });
    }
};

// Soft delete a Floor Management entry
const softDeleteFloorManagement = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFloorManagement = await FloorManagement.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true }, // Mark as deleted
            { new: true }
        );

        if (!updatedFloorManagement) {
            return res.status(404).json({status : false, message: 'Floor Management not found or already deleted' });
        }

        res.status(200).json({status : true, message: 'Floor Management deleted successfully', data: updatedFloorManagement });
    } catch (error) {
        res.status(500).json({status : false, message: 'Error deleting Floor Management', error });
    }
};

// Restore a soft-deleted Floor Management entry
const restoreFloorManagement = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFloorManagement = await FloorManagement.findOneAndUpdate(
            { _id: id, isDeleted: true },
            { isDeleted: false }, // Restore the entry
            { new: true }
        );

        if (!updatedFloorManagement) {
            return res.status(404).json({status : false, message: 'Floor Management not found or not deleted' });
        }

        res.status(200).json({ status : true, message: 'Floor Management restored successfully', data: updatedFloorManagement });
    } catch (error) {
        res.status(500).json({ status : false, message: 'Error restoring Floor Management', error });
    }
};

const updateFloorDetails = async (req, res) => {
    const { floorNumber } = req.params;
    const updateData = req.body; // This contains the data you want to update

    try {
        // Find the floor management record by floor number and update it
        const updatedFloor = await FloorManagement.findOneAndUpdate(
            { floorNumber: floorNumber },  // Find floor by floor number
            updateData,                    // The new data to update
            { new: true }                  // Return the updated document
        );

        if (!updatedFloor) {
            return res.status(404).json({ message: 'Floor not found' });
        }

        res.status(200).json({
            message: 'Floor details updated successfully',
            data: updatedFloor
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating floor details',
            error
        });
    }
};

module.exports = {
    createFloorManagement,
    getAllFloorManagement,
    softDeleteFloorManagement,
    restoreFloorManagement,
    getFloorManagement,
    updateFloorDetails
}