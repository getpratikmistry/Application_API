const router = require('express').Router();
const Listing = require('../models/listing');

// Get all listings
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching listings', error });
    }
});

// Get a single listing by ID
router.get("/:listingId", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching listing', error });
    }
});

// Create a new listing
router.post("/", async (req, res) => {
    try {
        const listing = new Listing(req.body);
        const savedListing = await listing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error creating listing', error });
    }
});

// Update a listing by ID
router.put("/:listingId", async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.listingId, req.body, { new: true, runValidators: true });
        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error updating listing', error });
    }
});

// Delete a listing by ID
router.delete("/:listingId", async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.listingId);
        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(deletedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error deleting listing', error });
    }
});

module.exports = router;