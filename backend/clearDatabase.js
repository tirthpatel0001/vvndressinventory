// Clear Database Script
// Drops Inventory and Order collections to prepare for fresh data

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './models/Inventory.js';
import Order from './models/Order.js';

dotenv.config();

const clearDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Drop collections
    console.log('\n🗑️  Dropping Inventory collection...');
    await Inventory.collection.drop().catch(() => {
      console.log('ℹ️  Inventory collection does not exist or already empty');
    });

    console.log('🗑️  Dropping Order collection...');
    await Order.collection.drop().catch(() => {
      console.log('ℹ️  Order collection does not exist or already empty');
    });

    console.log('\n✅ Database cleared successfully!');
    console.log('📌 Run "node models/sampleData.js" to populate with fresh data');

    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
