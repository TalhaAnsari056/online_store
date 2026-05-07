import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5000;

// Core middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running');
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
