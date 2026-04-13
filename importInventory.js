#!/usr/bin/env node

/**
 * Excel to MongoDB Inventory Importer
 * This script reads inventory data from balmandal.xlsx and imports it into MongoDB
 */

import openpyxl from 'openpyxl';  // Will use Python for reading Excel
import { spawn } from 'child_process';
import Inventory from '../backend/models/Inventory.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

// Function to read Excel file using Python
function readExcelFile(filePath) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['-c', `
import openpyxl
import json

workbook = openpyxl.load_workbook('${filePath}')
sheet = workbook.active
data = []
for row in sheet.iter_rows(min_row=2, values_only=True):
    if row[0] is not None:
        data.append({
            'sr_no': row[0],
            'section': row[1],
            'item_desc': row[2],
            'item_type': row[3],
            'color': row[4],
            'qty': row[5]
        })
print(json.dumps(data, indent=2, default=str))
`]);

    let output = '';
    let error = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0 && output) {
        try {
          resolve(JSON.parse(output));
        } catch (e) {
          reject(new Error('Failed to parse JSON: ' + e.message));
        }
      } else {
        reject(new Error(`Python error: ${error}`));
      }
    });
  });
}

// Function to assign prices based on item type
function assignPrice(itemType, color = '') {
  const itemTypeLower = itemType.toLowerCase().trim();
  
  // Base prices for different item types
  const basePrices = {
    'top': 800,
    'bottom': 900,
    'extra wearables': 1500,
    'dhoti': 800,
    'jabbha': 850,
    'koti': 900,
    'pyjama': 700
  };

  // Check exact match first
  if (basePrices[itemTypeLower]) {
    return basePrices[itemTypeLower];
  }

  // Check partial matches
  for (const [key, price] of Object.entries(basePrices)) {
    if (itemTypeLower.includes(key)) {
      return price;
    }
  }

  // Premium colors
  const premiumColors = ['velvet', 'silk', 'purple', 'maroon'];
  const colorLower = color.toLowerCase();
  
  if (premiumColors.some(premium => colorLower.includes(premium))) {
    return 1200;
  }

  // Default price
  return 850;
}

// Transform Excel data to Inventory schema
function transformData(excelData) {
  return excelData.map((item) => ({
    name: `${item.item_desc.trim()} (${item.color.trim()})`,
    category: item.item_type.trim() || 'Clothing',
    size: item.color.trim() || 'One Size',
    quantity: parseInt(item.qty) || 0,
    price: assignPrice(item.item_type, item.color)
  }));
}

// Main import function
async function importInventory() {
  try {
    console.log('📂 Starting inventory import...');
    console.log('🔌 Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected!');

    // Read Excel file
    console.log('📖 Reading Excel file...');
    const excelPath = './balmandal.xlsx';
    const excelData = await readExcelFile(excelPath);
    console.log(`✅ Found ${excelData.length} items in Excel`);

    // Transform data
    console.log('🔄 Transforming data...');
    const inventoryData = transformData(excelData);

    // Clear existing inventory (optional - comment out to keep existing data)
    // console.log('🗑️  Clearing existing inventory...');
    // await Inventory.deleteMany({});

    // Insert new data
    console.log('💾 Inserting inventory into database...');
    const result = await Inventory.insertMany(inventoryData);
    console.log(`✅ Successfully inserted ${result.length} items!`);

    // Display summary
    console.log('\n📊 Inventory Summary:');
    const categories = {};
    inventoryData.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { count: 0, quantity: 0 };
      }
      categories[item.category].count++;
      categories[item.category].quantity += item.quantity;
    });

    for (const [category, data] of Object.entries(categories)) {
      console.log(`  ${category}: ${data.count} items, ${data.quantity} units`);
    }

    console.log('\n✨ Import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during import:', error.message);
    process.exit(1);
  }
}

// Run the import
importInventory();
