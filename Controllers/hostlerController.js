const Hostler = require('../Models/Hostler');

// Create Hostler
const createHostler = async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      whatsappNumber,
      gender,
      occupation,
      roomType,
      floorNumber,
      roomNumber,
      rent,
      identificationType,
      images,
      candidatePhoto,
    } = req.body;

    const hostler = new Hostler({
      name,
      mobileNumber,
      whatsappNumber,
      gender,
      occupation,
      roomType,
      floorNumber,
      roomNumber,
      rent,
      identificationType,
      images,
      candidatePhoto,
    });

    await hostler.save();
    res.status(201).json({ message: 'Hostler added successfully', hostler });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get All Hostlers
const getAllHostlers = async (req, res) => {
  try {
    const hostlers = await Hostler.find();
    res.status(200).json({ hostlers });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Hostler by ID
const getHostlerById = async (req, res) => {
  try {
    const hostler = await Hostler.findById(req.params.id);
    if (!hostler) return res.status(404).json({ message: 'Hostler not found' });
    res.status(200).json({ hostler });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Hostler
const updateHostler = async (req, res) => {
  try {
    const hostler = await Hostler.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hostler) return res.status(404).json({ message: 'Hostler not found' });
    res.status(200).json({ message: 'Hostler updated successfully', hostler });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete Hostler
const deleteHostler = async (req, res) => {
  try {
    const hostler = await Hostler.findByIdAndDelete(req.params.id);
    if (!hostler) return res.status(404).json({ message: 'Hostler not found' });
    res.status(200).json({ message: 'Hostler deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createHostler,
  getAllHostlers,
  getHostlerById,
  updateHostler,
  deleteHostler,
};
