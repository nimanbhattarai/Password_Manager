const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')

dotenv.config()


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const uri = "mongodb+srv://nimanbhattarai1234:niman123@passwordmanagercluster1.z4wjv.mongodb.net/passop?retryWrites=true&w=majority&appName=passwordmanagerCluster1";


// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
const cors=require('cors')

app.use(bodyParser.json())
app.use(cors())

client.connect();

let db;

async function connectToDatabase() {
  if (!db) {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db('passop');
  }
  return db;
}

// Get all the passwords
app.get('/', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Save the Password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = await connectToDatabase();
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
});

// Delete the Password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = await connectToDatabase();
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})