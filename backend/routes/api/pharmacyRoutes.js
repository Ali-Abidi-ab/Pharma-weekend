const express = require('express');
const { getPharmacies, getNearbyPharmacies, createPharmacy } = require('../controllers/pharmacyController');

const router = express.Router();

router.get('/', getPharmacies);
router.get('/nearby', getNearbyPharmacies);
router.post('/', createPharmacy);

module.exports = router;