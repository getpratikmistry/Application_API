const mongoose = require('mongoose');

// Define the schema for the listing
const questionSchema = new mongoose.Schema({
    question: String,
    multipleAnswer: Boolean,
    answerOptions: [{
        optionTitle: String,
        isCorrect: Boolean
    }],
    questionNo: Number
});

// Create the Listing model
const Question = mongoose.model('Question', questionSchema);

// Export the model
module.exports = Question;