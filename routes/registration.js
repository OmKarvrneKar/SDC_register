const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Submit registration
router.post('/', async (req, res) => {
    try {
        const registration = new Registration(req.body);
        await registration.save();
        res.status(201).json({
            success: true,
            message: 'Registration submitted successfully',
            data: registration
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// Get all registrations
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching registrations',
            error: error.message
        });
    }
});

// Update registration status
router.patch('/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.status(200).json({
            success: true,
            data: registration
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating registration',
            error: error.message
        });
    }
});

module.exports = router; 