import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../server/.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MongoDB URI is not defined in environment variables');
  process.exit(1);
}

const client = new MongoClient(uri);

// Random data generation helpers
const buildings = [
  'Library', 'Science Center', 'Student Union', 'Engineering Building', 
  'Arts Hall', 'Business School', 'Medical Building', 'Law School',
  'Computer Science Building', 'Mathematics Department', 'Physics Building'
];

const floors = ['1st Floor', '2nd Floor', '3rd Floor', 'Basement', 'Ground Floor', 'Mezzanine'];

const noiselevels = ['quiet', 'moderate', 'noisy'];

const spotNames = [
  'Corner Table', 'Window Nook', 'Study Carrel', 'Group Table', 'Lounge Area',
  'Private Room', 'Quiet Zone', 'Collaborative Space', 'Hidden Spot', 'Comfy Couch Area',
  'Coffee Shop Corner', 'Reading Room', 'Tech Hub', 'Whiteboard Station', 'Standing Desk Area',
  'Garden View', 'Atrium Seats', 'Media Center', 'Conference Room', 'Computer Lab'
];

// Generate random reviews
const generateReviews = (spotIds, count) => {
  const reviews = [];
  const comments = [
    'Great spot for focus work!', 
    'Too noisy during peak hours.',
    'Comfortable seating and good lighting.',
    'WiFi can be spotty here.',
    'Perfect for group study sessions.',
    'Hard to find an open spot during finals.',
    'Outlets are conveniently located.',
    'Love the natural lighting here.',
    'Could use more comfortable chairs.',
    'My go-to spot for cramming before exams.',
    'Quiet and peaceful atmosphere.',
    'Can get crowded between classes.',
    'Staff is very helpful.',
    'Temperature is always perfect here.',
    'Best view on campus!',
    'A hidden gem for focused studying.',
    'Good spot but limited seating.',
    'Great for both individual and group work.',
    'Needs more power outlets.',
    'Clean and well-maintained.',
    'A bit isolated but good for concentration.',
    'Close to food options, which is convenient.',
    'Tables are a good size for spreading out materials.',
    'Chairs could be more ergonomic.',
    'Excellent spot to meet for group projects.'
  ];

  for (let i = 0; i < count; i++) {
    const randomSpotId = spotIds[Math.floor(Math.random() * spotIds.length)];
    const rating = Math.floor(Math.random() * 5) + 1; // 1-5 rating
    const comment = comments[Math.floor(Math.random() * comments.length)];
    
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 60)); // Random date from past 60 days
    
    reviews.push({
      spotId: randomSpotId,
      rating,
      comment,
      createdAt
    });
  }
  
  return reviews;
};

// Generate random spots
const generateSpots = (count) => {
  const spots = [];
  
  for (let i = 0; i < count; i++) {
    const building = buildings[Math.floor(Math.random() * buildings.length)];
    const floor = floors[Math.floor(Math.random() * floors.length)];
    const hasOutlet = Math.random() > 0.3; // 70% chance of having outlets
    const noiseLevel = noiselevels[Math.floor(Math.random() * noiselevels.length)];
    const baseName = spotNames[Math.floor(Math.random() * spotNames.length)];
    const name = `${baseName} in ${building}`;
    
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30)); // Random date from past 30 days
    
    spots.push({
      name,
      building,
      floor,
      hasOutlet,
      noiseLevel,
      createdAt,
      likes: Math.floor(Math.random() * 50) // Random likes count
    });
  }
  
  return spots;
};

// Insert data into database
async function generateData() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('URI:', uri.replace(/:[^:]*@/, ':****@')); // Log URI with credentials masked
    await client.connect();
    console.log('Connected to MongoDB!');
    
    const db = client.db();
    
    // Generate and insert spots
    console.log('Generating spots...');
    const spots = generateSpots(100); // Generate 100 spots
    const spotsResult = await db.collection('spots').insertMany(spots);
    console.log(`Inserted ${spotsResult.insertedCount} spots`);
    
    // Get inserted spot IDs
    const spotIds = Object.values(spotsResult.insertedIds);
    
    // Generate and insert reviews
    console.log('Generating reviews...');
    const reviews = generateReviews(spotIds, 1000); // Generate 1000 reviews
    const reviewsResult = await db.collection('reviews').insertMany(reviews);
    console.log(`Inserted ${reviewsResult.insertedCount} reviews`);
    
    console.log('Data generation complete!');
  } catch (error) {
    console.error('Error generating data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

generateData();
