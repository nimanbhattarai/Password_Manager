const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'passop';

// Initialize MongoDB client
let db;
async function connectToDatabase() {
  if (!db) {
    try {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      db = client.db(dbName);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
  return db;
}

// Get all the passwords
app.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('passwords');
    const passwords = await collection.find({}).toArray();
    res.json(passwords);
  } catch (error) {
    console.error('Error fetching passwords:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save the Password
app.post('/', async (req, res) => {
  try {
    const password = req.body;
    const db = await connectToDatabase();
    const collection = db.collection('passwords');
    const result = await collection.insertOne(password);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error saving password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete the Password
app.delete('/', async (req, res) => {
  try {
    const password = req.body;
    const db = await connectToDatabase();
    const collection = db.collection('passwords');
    const result = await collection.deleteOne(password);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
