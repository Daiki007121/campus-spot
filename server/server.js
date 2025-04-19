import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware - for development flexibility and production security
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://campusspot-web.onrender.com',
    'https://campus-spot-complete.vercel.app',
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
});

// MongoDB connection
const uri = process.env.MONGODB_URI;
let db;

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Successfully connected to MongoDB');
    db = client.db();
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Spots API
app.get('/api/spots', async (req, res) => {
  try {
    const spots = await db.collection('spots')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json(spots);
  } catch (error) {
    console.error('Error fetching spots:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/spots', async (req, res) => {
  try {
    const spot = {
      ...req.body,
      createdAt: new Date(),
      likes: 0
    };
    const result = await db.collection('spots').insertOne(spot);
    res.status(201).json({ ...spot, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating spot:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/spots/:id', async (req, res) => {
  try {
    const spot = await db.collection('spots').findOne({ _id: new ObjectId(req.params.id) });
    if (spot) {
      res.json(spot);
    } else {
      res.status(404).json({ message: 'Spot not found' });
    }
  } catch (error) {
    console.error('Error fetching spot:', error);
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/spots/:id', async (req, res) => {
  try {
    const result = await db.collection('spots').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Spot not found' });
    } else {
      res.json({ message: 'Spot updated successfully' });
    }
  } catch (error) {
    console.error('Error updating spot:', error);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/spots/:id', async (req, res) => {
  try {
    const result = await db.collection('spots').deleteOne({ 
      _id: new ObjectId(req.params.id) 
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Spot not found' });
    } else {
      res.json({ message: 'Spot deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting spot:', error);
    res.status(400).json({ message: error.message });
  }
});

// Reviews API
app.get('/api/reviews/spot/:spotId', async (req, res) => {
  try {
    const reviews = await db.collection('reviews')
      .find({ spotId: req.params.spotId })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const review = {
      ...req.body,
      createdAt: new Date()
    };
    const result = await db.collection('reviews').insertOne(review);
    res.status(201).json({ ...review, _id: result.insertedId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    }
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

export default app;
