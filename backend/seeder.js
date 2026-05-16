import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data/products.js';
import Product from './models/productModel.js';

dotenv.config();

const seedProducts = async () => {
  let exitCode = 0;

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const deleteResult = await Product.deleteMany({});
    console.log(`Removed ${deleteResult.deletedCount} existing products`);

    const insertedProducts = await Product.insertMany(products);
    console.log(`Seeding successful: inserted ${insertedProducts.length} products`);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    exitCode = 1;
  } finally {
    await mongoose.connection.close();
    process.exit(exitCode);
  }
};

seedProducts();
