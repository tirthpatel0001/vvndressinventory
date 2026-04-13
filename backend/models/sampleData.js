// Sample data script for populating initial inventory
// Run this after MongoDB is connected to add sample dress items
// Usage: node models/sampleData.js (after connecting to MongoDB)

import Inventory from './Inventory.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const sampleInventory = [
  { name: 'classical upvastra', category: 'top', color: 'rama', section: '1/1', quantity: 7 },
  { name: 'kamar patta', category: 'extra wearbales', color: 'rama', section: '1/1', quantity: 6 },
  { name: 'velvet classical', category: 'top', color: 'purple', section: '1/1', quantity: 8 },
  { name: 'classical top', category: 'top', color: 'maroon', section: '1/1', quantity: 8 },
  { name: 'classical top', category: 'top', color: 'rama', section: '1/1', quantity: 8 },
  { name: 'classical dhoti', category: 'bottom', color: 'rama', section: '1/1', quantity: 6 },
  { name: 'plain pyjama', category: 'bottom', color: 'red', section: '1/2', quantity: 7 },
  { name: 'classical dhoti', category: 'bottom', color: 'dark pink', section: '1/2', quantity: 11 },
  { name: 'classical dhoti', category: 'bottom', color: 'pink', section: '1/2', quantity: 7 },
  { name: 'classical dhoti', category: 'bottom', color: 'light purple', section: '1/2', quantity: 8 },
  { name: 'classical dhoti', category: 'bottom', color: 'navy blue', section: '1/3', quantity: 52 },
  { name: 'koti', category: 'top', color: 'brown', section: '1/3', quantity: 10 },
  { name: 'koti', category: 'top', color: 'red', section: '1/3', quantity: 3 },
  { name: 'classical jabbha', category: 'top', color: 'blue', section: '1/4', quantity: 22 },
  { name: 'plain jabbha', category: 'top', color: 'blue', section: '1/4', quantity: 10 },
  { name: 'servani dupatta', category: 'extra wearbales', color: 'red', section: '2/1', quantity: 24 },
  { name: 'classical dhoti', category: 'bottom', color: 'light green', section: '2/2', quantity: 18 },
  { name: 'classical dhoti', category: 'bottom', color: 'dark green', section: '2/2', quantity: 16 },
  { name: 'classical dhoti', category: 'bottom', color: 'sky blue', section: '2/2', quantity: 4 },
  { name: 'classical dhoti', category: 'bottom', color: 'sky blue', section: '2/2', quantity: 4 },
  { name: 'classical dhoti', category: 'bottom', color: 'pink', section: '2/2', quantity: 4 },
  { name: 'classical dhoti', category: 'bottom', color: 'pink', section: '2/2', quantity: 4 },
  { name: 'dhoti', category: 'bottom', color: 'pink', section: '2/3', quantity: 11 },
  { name: 'dhoti', category: 'bottom', color: 'light purple', section: '2/3', quantity: 3 },
  { name: 'dhoti', category: 'bottom', color: 'dark purple', section: '2/3', quantity: 2 },
  { name: 'dhoti', category: 'bottom', color: 'yellow', section: '2/3', quantity: 1 },
  { name: 'dhoti', category: 'bottom', color: 'white', section: '2/3', quantity: 1 },
  { name: 'silk dhoti', category: 'bottom', color: 'pink', section: '2/3', quantity: 2 },
  { name: 'velvet dhoti', category: 'bottom', color: 'maroon', section: '2/3', quantity: 1 },
  { name: 'dhoti', category: 'bottom', color: 'dark pink', section: '2/3', quantity: 1 },
  { name: 'readymade dhoti', category: 'bottom', color: 'bhagwa', section: '2/3', quantity: 1 },
  { name: 'special kediya', category: 'pair', color: 'yellow', section: '2/4', quantity: 2 },
  { name: 'special kediya', category: 'pair', color: 'pink', section: '2/4', quantity: 2 },
  { name: 'special kediya', category: 'pair', color: 'rama', section: '2/4', quantity: 2 },
  { name: 'special kediya', category: 'pair', color: 'red', section: '2/4', quantity: 4 },
  { name: 'special kediya', category: 'pair', color: 'purple', section: '2/4', quantity: 6 },
  { name: 'sagar dress', category: 'pair', color: 'mix', section: '3/3', quantity: 10 },
  { name: 'mukut,kammar patta etc.', category: 'extra wearbales', color: 'mix', section: '3/4', quantity: 100 },
  { name: 'classical pagh', category: 'headwear', color: 'green', section: '4/1', quantity: 16 },
  { name: 'classical pagh', category: 'headwear', color: 'pink', section: '4/2', quantity: 8 },
  { name: 'classical pagh', category: 'headwear', color: 'dark pink', section: '4/2', quantity: 9 },
  { name: 'sherwani pagh', category: 'headwear', color: 'red', section: '4/2', quantity: 10 },
  { name: 'classical pagh', category: 'headwear', color: 'light purple', section: '4/3', quantity: 11 },
  { name: 'disco topi', category: 'headwear', color: 'black', section: '4/3', quantity: 12 },
  { name: 'classical pagh', category: 'headwear', color: 'yellow', section: '4/3', quantity: 5 },
  { name: 'classical pagh', category: 'headwear', color: 'light pink', section: '4/4', quantity: 4 },
  { name: 'classical pagh', category: 'headwear', color: 'sky blue', section: '4/4', quantity: 4 },
  { name: 'classical pagh', category: 'headwear', color: 'purple', section: '4/4', quantity: 4 },
  { name: 'classical pagh', category: 'headwear', color: 'dark purple', section: '4/4', quantity: 2 },
  { name: 'gadvi pagh', category: 'headwear', color: 'red', section: '4/4', quantity: 5 },
  { name: 'kacchi dhoti', category: 'bottom', color: 'mix', section: '5/1', quantity: 16 },
  { name: 'kacchi kediya', category: 'top', color: 'mix', section: '5/1', quantity: 16 },
  { name: 'kacchi koti', category: 'top', color: 'yellow', section: '5/1', quantity: 15 },
  { name: 'kacchi topi', category: 'headwear', color: 'mix', section: '5/1', quantity: 16 },
  { name: 'kediya', category: 'top', color: 'yellow', section: '5/2', quantity: 15 },
  { name: 'kediya', category: 'top', color: 'dark yellow', section: '5/2', quantity: 3 },
  { name: 'kediya', category: 'top', color: 'white', section: '5/2', quantity: 5 },
  { name: 'kediya', category: 'top', color: 'red', section: '5/3', quantity: 8 },
  { name: 'kediya', category: 'top', color: 'purple', section: '5/3', quantity: 5 },
  { name: 'classical kediya', category: 'top', color: 'pink', section: '5/3', quantity: 3 },
  { name: 'kediya', category: 'top', color: 'blue', section: '5/3', quantity: 1 },
  { name: 'kediya', category: 'top', color: 'dark yellow', section: '5/3', quantity: 1 },
  { name: 'kediya', category: 'top', color: 'dark pink', section: '5/3', quantity: 5 }
];

const insertSampleData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing inventory
    await Inventory.deleteMany({});
    console.log('Cleared existing inventory');

    // Insert sample data
    const result = await Inventory.insertMany(sampleInventory);
    console.log(`✅ Successfully inserted ${result.length} items`);

    console.log('\nSample Inventory Added:');
    result.forEach(item => {
      console.log(`  - ${item.name} (${item.size}): ${item.quantity} units @ $${item.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

insertSampleData();
