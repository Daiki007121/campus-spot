import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

// 環境変数のロード
dotenv.config();

// Expressアプリケーションの作成
const app = express();
const port = process.env.PORT || 5000;

// CORS設定 - 重要: これを最初に配置
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// すべてのルートでCORSを有効にする
app.use(cors(corsOptions));

// オプションリクエストを明示的に処理
app.options('*', cors(corsOptions));

app.use(express.json());

// MongoDB接続
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

// すべてのリクエストに対してCORSヘッダーを設定
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// テスト用エンドポイント - CORSが機能しているか確認
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

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
    res.status(201).json({ ...result, _id: result.insertedId });
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
    res.status(201).json({ ...result, _id: result.insertedId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// サーバーの起動
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
