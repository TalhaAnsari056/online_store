import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Mouse',
    price: 29.99,
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    image: '/images/mouse.jpg',
    category: 'Electronics',
    countInStock: 25,
  },
  {
    name: 'Mechanical Keyboard',
    price: 89.99,
    description: 'RGB mechanical keyboard with blue switches.',
    image: '/images/keyboard.jpg',
    category: 'Electronics',
    countInStock: 15,
  },
  {
    name: 'Running Shoes',
    price: 59.99,
    description: 'Lightweight running shoes for daily workouts.',
    image: '/images/shoes.jpg',
    category: 'Fashion',
    countInStock: 40,
  },
  {
    name: 'Insulated Water Bottle',
    price: 19.99,
    description: 'Stainless steel bottle that keeps drinks cold for 24 hours.',
    image: '/images/bottle.jpg',
    category: 'Accessories',
    countInStock: 60,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Seeding successful: inserted ${insertedProducts.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
