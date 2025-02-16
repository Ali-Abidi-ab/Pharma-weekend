const Pharmacy = require('../models/Pharmacy');

// Get all pharmacies
const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
} catch (error) {
  res.status(500).json({ message: 'Server error' });
}
};

// Get pharmacies near a location
const getNearbyPharmacies = async (req, res) => {
const { longitude, latitude } = req.query;

try {
  const pharmacies = await Pharmacy.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: 5000, // 5 km
      },
    },
  });

  res.json(pharmacies);
} catch (error) {
  res.status(500).json({ message: 'Server error' });
}
};

// Create a new pharmacy
const createPharmacy = async (req, res) => {
const { name, location } = req.body;

try {
  const pharmacy = new Pharmacy({
    name,
    location: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    },
  });

  await pharmacy.save();
  res.status(201).json(pharmacy);
} catch (error) {
  res.status(400).json({ message: 'Invalid data' });
}
};

module.exports = { getPharmacies, getNearbyPharmacies, createPharmacy };