#!/usr/bin/env python3
"""
Excel to MongoDB Inventory Importer
This script reads balmandal.xlsx and imports data into MongoDB
"""

import openpyxl
from pymongo import MongoClient
from datetime import datetime

def read_excel_file(file_path):
    """Read data from Excel file"""
    print(f"📖 Reading Excel file: {file_path}")
    
    try:
        workbook = openpyxl.load_workbook(file_path)
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
        
        print(f"✅ Found {len(data)} items")
        return data
    except Exception as e:
        print(f"❌ Error reading Excel: {e}")
        return None

def assign_price(item_type, color=""):
    """Assign price based on item type and color"""
    item_type_lower = str(item_type).lower().strip()
    color_lower = str(color).lower().strip()
    
    # Base prices for different types
    base_prices = {
        'top': 800,
        'bottom': 900,
        'extra wearables': 1500,
        'dhoti': 850,
        'jabbha': 900,
        'koti': 950,
        'pyjama': 750,
        'pyjma': 750,
        'updvastra': 1000,
        'servani': 1200,
        'duppata': 600
    }
    
    # Check for exact matches
    for key, price in base_prices.items():
        if key in item_type_lower:
            base_price = price
            break
    else:
        base_price = 800  # Default price
    
    # Apply color premium
    premium_colors = ['velvet', 'silk', 'purple', 'maroon', 'dark pink', 'dark green', 'navy blue']
    if any(color in color_lower for color in premium_colors):
        return int(base_price * 1.2)
    
    return base_price

def transform_data(excel_data):
    """Transform Excel data to MongoDB schema"""
    print("🔄 Transforming data to inventory format...")
    
    inventory_items = []
    
    for item in excel_data:
        try:
            qty = int(item['qty']) if item['qty'] else 0
            
            # Create inventory document
            inv_item = {
                'name': f"{str(item['item_desc']).strip()} - {str(item['color']).strip()}",
                'category': str(item['item_type']).strip() or 'Clothing',
                'size': str(item['color']).strip() or 'One Size',
                'quantity': qty,
                'price': assign_price(item['item_type'], item['color']),
                'section': str(item['section']).strip(),
                'createdAt': datetime.now(),
                'updatedAt': datetime.now()
            }
            
            inventory_items.append(inv_item)
        except Exception as e:
            print(f"⚠️  Error transforming row: {e}")
            continue
    
    print(f"✅ Transformed {len(inventory_items)} items")
    return inventory_items

def import_to_mongodb(inventory_items, username, password, cluster):
    """Import data to MongoDB using URI components"""
    try:
        print("\n🔌 Connecting to MongoDB...")
        
        # Build connection URI
        import urllib.parse
        encoded_password = urllib.parse.quote_plus(password)
        uri = f"mongodb+srv://{username}:{encoded_password}@{cluster}/?retryWrites=true&w=majority&appName=vvndressinventory"
        
        client = MongoClient(uri, connectTimeoutMS=10000, serverSelectionTimeoutMS=10000)
        
        # Verify connection
        client.admin.command('ping')
        print("✅ MongoDB connected!")
        
        # Connect to database
        db = client['vvndressinventory']
        collection = db['inventories']
        
        # Clear existing inventory
        print("🗑️  Clearing existing inventory...")
        collection.delete_many({})
        
        # Insert new data
        print(f"💾 Inserting {len(inventory_items)} items into MongoDB...")
        result = collection.insert_many(inventory_items)
        print(f"✅ Successfully inserted {len(result.inserted_ids)} items!")
        
        client.close()
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

def print_summary(inventory_items):
    """Print import summary"""
    print("\n📊 INVENTORY SUMMARY")
    print("=" * 60)
    
    categories = {}
    total_qty = 0
    total_value = 0
    
    for item in inventory_items:
        cat = item['category']
        qty = item['quantity']
        value = qty * item['price']
        
        if cat not in categories:
            categories[cat] = {'count': 0, 'qty': 0, 'value': 0}
        
        categories[cat]['count'] += 1
        categories[cat]['qty'] += qty
        categories[cat]['value'] += value
        
        total_qty += qty
        total_value += value
    
    print(f"{'Category':<25} {'Items':<10} {'Quantity':<12} {'Value (₹)':<15}")
    print("-" * 60)
    
    for cat, data in sorted(categories.items()):
        print(f"{cat:<25} {data['count']:<10} {data['qty']:<12} ₹{data['value']:>12,.2f}")
    
    print("-" * 60)
    print(f"{'TOTAL':<25} {len(inventory_items):<10} {total_qty:<12} ₹{total_value:>12,.2f}")
    print("=" * 60)

def main():
    """Main function"""
    print("\n🎯 DRESS SHOP INVENTORY IMPORTER")
    print("=" * 60)
    
    # Read Excel file
    excel_data = read_excel_file('./balmandal.xlsx')
    if not excel_data:
        print("❌ Failed to read Excel file")
        return
    
    # Transform data
    inventory_items = transform_data(excel_data)
    if not inventory_items:
        print("❌ No items to import")
        return
    
    # Print summary
    print_summary(inventory_items)
    
    # MongoDB credentials
    print("\n📝 MongoDB Connection Details:")
    username = "tp680981_db_user"
    password = "TirthPatel"
    cluster = "vvndressinventory.n4kbota.mongodb.net"
    
    print(f"  Username: {username}")
    print(f"  Cluster: {cluster}")
    
    # Import to MongoDB
    print("\n" + "=" * 60)
    if import_to_mongodb(inventory_items, username, password, cluster):
        print("\n✨ IMPORT COMPLETED SUCCESSFULLY!")
        print("=" * 60)
        print("\n📱 You can now view this data in your application:")
        print("   1. Start the backend: cd backend && npm start")
        print("   2. Start the frontend: cd frontend && npm start")
        print("   3. Login with: admin123 / admin123")
        print("   4. Go to Dashboard to see all 62 items (591 units total)")
    else:
        print("\n❌ IMPORT FAILED")
        print("=" * 60)

if __name__ == "__main__":
    main()
