const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection URI (use environment variable for MongoDB Atlas)
const uri = process.env.MONGODB_URI; // Ensure this is set in the environment
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = 'passop';

// Connect to MongoDB (Connect once and reuse the connection)
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

connectToDatabase();

// Get all the passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Save the Password
app.post('/', async (req, res) => {
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.insertOne(password);
        res.json({ success: true, result: findResult });
    } catch (error) {
        console.error('Error saving password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete the Password
app.delete('/', async (req, res) => {
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne(password);
        res.json({ success: true, result: findResult });
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
