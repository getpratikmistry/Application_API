const router = require('express').Router();
const Question = require('../models/question');

// Get all listings
router.get("/", async (req, res) => {
    try {
        const listings = await Question.find();
        res.json(listings);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching Questions', error });
    }
});

// Get a single listing by ID
router.get("/:listingId", async (req, res) => {
    try {
        const listing = await Question.findById(req.params.listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(listing);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching Question', error });
    }
});

// Create a new listing
router.post("/", async (req, res) => {
    try {
        const listing = new Question(req.body);
        const savedListing = await listing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error creating Question', error });
    }
});

// Update a listing by ID
router.put("/:listingId", async (req, res) => {
    try {
        const updatedListing = await Question.findByIdAndUpdate(req.params.listingId, req.body, { new: true, runValidators: true });
        if (!updatedListing) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error updating Question', error });
    }
});

// Delete a listing by ID
router.delete("/:listingId", async (req, res) => {
    try {
        const deletedListing = await Question.findByIdAndDelete(req.params.listingId);
        if (!deletedListing) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(deletedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error deleting Question', error });
    }
});

module.exports = router;