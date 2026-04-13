# 🎯 Complete Setup Guide

This guide will walk you through setting up the Dress Shop Inventory Management System step-by-step.

## Prerequisites Check ✅

Before starting, ensure you have:
- [ ] Node.js installed (v14+) → Download from [nodejs.org](https://nodejs.org)
- [ ] A code editor (VS Code recommended)
- [ ] MongoDB Atlas account (free tier available)
- [ ] Basic command line knowledge

---

## Step 1: Get MongoDB Password 🔑

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in to your account
3. Find the cluster: `vvndressinventory`
4. Click "Connect"
5. Choose "Connect with MongoDB Compass or Drivers"
6. Copy the password for user: `tp680981_db_user`
7. Save this password, you'll need it in the next step

---

## Step 2: Setup Backend 🖥️

### 2.1 Navigate to Backend
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- mongodb

### 2.3 Configure Environment
Edit `backend/.env` file:

**BEFORE (current):**
```
MONGODB_URI=mongodb+srv://tp680981_db_user:YourPasswordHere@vvndressinventory.n4kbota.mongodb.net/?appName=vvndressinventory
PORT=5000
```

**AFTER (replace YourPasswordHere):**
```
MONGODB_URI=mongodb+srv://tp680981_db_user:YOUR_ACTUAL_PASSWORD@vvndressinventory.n4kbota.mongodb.net/?appName=vvndressinventory
PORT=5000
```

### 2.4 Start Backend Server
```bash
npm start
```

**Expected Output:**
```
Connecting to MongoDB...
URI: mongodb+srv://...
✅ MongoDB connected successfully!
🚀 Server running on https://vvndressinventory.onrender.com
```

**✅ Backend is Ready!** (Keep this terminal running)

---

## Step 3: Setup Frontend 📱

### 3.1 Open New Terminal and Navigate
```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios

⚠️ **Note:** First `npm install` may take 2-3 minutes. Be patient!

### 3.3 Start Frontend Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view dress-inventory-frontend in the browser.

  Local:            http://localhost:3000
  Connecting your browser...
```

**✅ Frontend is Ready!** Browser should open automatically.

---

## Step 4: Login 🔐

### Login Page
You should see the login page automatically. If not, visit: `http://localhost:3000`

### Enter Credentials
```
Username: admin123
Password: admin123
```

### Success
After login, you'll see the Dashboard with:
- Inventory table (currently empty)
- Add Item form
- Navigation buttons

---

## Step 5: Add Sample Data 📦

### Option A: Add Items via UI (Recommended for First Time)

1. Click **"➕ Add New Item"** on the Dashboard
2. Fill in the form:

   **Item 1:**
   - Name: Summer Beach Dress
   - Category: Casual
   - Size: M
   - Quantity: 20
   - Price: 29.99
   - Click "Add Item"

   **Item 2:**
   - Name: Evening Gown
   - Category: Formal
   - Size: L
   - Quantity: 8
   - Price: 89.99
   - Click "Add Item"

   **Item 3:**
   - Name: Cocktail Dress
   - Category: Party
   - Size: M
   - Quantity: 12
   - Price: 59.99
   - Click "Add Item"

   **Item 4:**
   - Name: Garden Party Dress
   - Category: Semi-Casual
   - Size: S
   - Quantity: 15
   - Price: 39.99
   - Click "Add Item"

### Option B: Add Items via Script (Faster)

1. In backend terminal, press **Ctrl+C** to stop server (keep it for later)
2. Run:
   ```bash
   node models/sampleData.js
   ```
3. Expected output:
   ```
   ✅ Successfully inserted 13 items
   Sample Inventory Added:
     - Summer Beach Dress (S): 15 units @ $29.99
     - Summer Beach Dress (M): 20 units @ $29.99
     ...
   ```
4. Restart backend:
   ```bash
   npm start
   ```

---

## Step 6: Test Features 🧪

### 6.1 Dashboard
- Refresh the page to see inventory items
- Verify all items appear in the table
- Check stock status indicators

### 6.2 Create Order
1. Click **"📋 Create Order"** button or navigate to Orders page
2. Click **"➕ Create New Order"**
3. Fill order:
   - Select Item: "Summer Beach Dress (M)"
   - Quantity: 3
   - Click "➕ Add Item"
4. Verify total amount
5. Click **"✅ Create Order"**

### 6.3 Verify Inventory Deduction
- Go back to Dashboard
- Check "Summer Beach Dress (M)" quantity
- Should be reduced by 3 (20 → 17)

### 6.4 View Orders
1. Go to Orders page
2. See your created order with:
   - Order status (pending)
   - Items list
   - Total amount
   - "Mark as Returned" button

### 6.5 Return Order
1. Click **"🔄 Mark as Returned"** button
2. Confirm dialog
3. Order status changes to "returned"
4. Go back to Dashboard
5. Inventory quantity should be restored (17 → 20)

---

## Troubleshooting 🔧

### MongoDB Connection Error
**Error:** `MongoDB connection failed`
- [ ] Check MongoDB password in `.env`
- [ ] Verify IP whitelist on Atlas
- [ ] Check internet connection
- [ ] Restart backend

### Port Already in Use
**Error:** `Port 5000 already in use`

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -i :5000
kill -9 <PID>
```

### CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS`
- Verify backend is running on port 5000
- Check for errors in browser console
- Try refreshing the page

### Blank Dashboard
**Cause:** No inventory items exist yet
- Add items using the form
- Or use `node models/sampleData.js`
- Refresh page after adding data

### npm install takes forever
- This is normal for first install
- Don't interrupt the process
- Use a faster npm mirror if needed:
  ```bash
  npm config set registry https://registry.npm.taobao.org
  ```

---

## Useful Commands 🎯

### Backend
```bash
# Install dependencies
npm install

# Start server (watch mode)
npm start

# Or with nodemon (auto-restart on changes)
npm install -g nodemon
npm run dev
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## API Health Check 🏥

Verify everything is working:

1. **Backend Health:**
   - Visit: https://vvndressinventory.onrender.com/api/health
   - Should see: `{"message":"Server is running!"}`

2. **Fetch All Inventory:**
   - Visit: https://vvndressinventory.onrender.com/api/inventory
   - Should see JSON array of items

3. **Fetch All Orders:**
   - Visit: https://vvndressinventory.onrender.com/api/orders
   - Should see JSON array of orders

---

## Production Checklist ✅

Before deploying:
- [ ] Change hardcoded credentials (admin123/admin123)
- [ ] Use environment variables for all sensitive data
- [ ] Implement proper JWT authentication
- [ ] Add input validation
- [ ] Setup HTTPS
- [ ] Enable database backups
- [ ] Setup error logging
- [ ] Add unit tests

---

## File Structure Reference 📁

```
vvndressinventory/
├── backend/
│   ├── models/
│   │   ├── Inventory.js         # Dress items schema
│   │   ├── Order.js              # Orders schema
│   │   └── sampleData.js         # Sample data insertion script
│   ├── routes/
│   │   ├── inventoryRoutes.js   # Inventory API routes
│   │   └── orderRoutes.js        # Orders API routes
│   ├── server.js                 # Main Express server
│   ├── package.json
│   ├── .env                      # Environment config
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   ├── index.html            # HTML template
│   │   └── favicon.ico
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Dashboard.js      # Inventory dashboard
│   │   │   └── Orders.js         # Orders management
│   │   ├── components/
│   │   │   ├── InventoryTable.js # Inventory table display
│   │   │   └── OrderForm.js      # Order creation form
│   │   ├── styles/
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.css
│   │   │   ├── InventoryTable.css
│   │   │   ├── Orders.css
│   │   │   └── OrderForm.css
│   │   ├── api.js                # Axios API configuration
│   │   ├── App.js                # Main app component
│   │   ├── App.css
│   │   ├── index.js              # Entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   ├── .gitignore
│   └── .eslintrc.json
│
├── README.md                      # Full documentation
├── QUICK_START.md                 # Quick setup guide
├── SETUP_GUIDE.md                 # This file
└── .gitignore
```

---

## Next Steps 🚀

1. ✅ Complete the setup
2. ✅ Test all features
3. 📝 Add more items to inventory
4. 📊 Create and manage orders
5. 🔄 Test return functionality
6. 🎨 Customize UI if needed
7. 🚀 Deploy to production

---

## Support 📞

If you encounter issues:
1. Check browser console (F12)
2. Check terminal output
3. Review error messages carefully
4. Check MongoDB connection
5. Verify all files are created
6. Restart services

---

**Congratulations! You're all set to manage your dress shop inventory! 🎉**
