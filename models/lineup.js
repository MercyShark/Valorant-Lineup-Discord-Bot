import mongoose from "mongoose";

// Define the schema for lineups
const lineupSchema = new mongoose.Schema({
    agent: {
        type: String,
        required: true
    },
    map: {
        type: String,
        required: true
    },
    lineups_videos: [{
        type: String, // URL stored as a string
        required: true
    }]
});

// Create the model from the schema
const Lineup = mongoose.model('Lineup', lineupSchema);

export default Lineup;
