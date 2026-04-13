# Dress Shop Inventory Management System

A complete MERN stack (MongoDB, Express.js, React.js, Node.js) Inventory Management System for a dress shop with login authentication, inventory management, order processing, and return handling.

## 🎯 Features

- ✅ **Simple Login System** - Hardcoded credentials for admin authentication
- ✅ **Inventory Management** - View, add, and manage dress items
- ✅ **Order Creation** - Create orders with automatic inventory deduction
- ✅ **Order Management** - Track all orders and their status
- ✅ **Return Processing** - Mark orders as returned and restore inventory
- ✅ **Responsive UI** - Clean, modern interface
- ✅ **MongoDB Integration** - Persistent data storage

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, React Router, CSS3
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Port:** Frontend on 3000, Backend on 5000

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account
- VS Code

## 📦 Project Structure

```
vvndressinventory/
├── backend/
│   ├── models/
│   │   ├── Inventory.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── inventoryRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   └── Orders.js
    │   ├── components/
    │   │   ├── InventoryTable.js
    │   │   └── OrderForm.js
    │   ├── styles/
    │   │   ├── Login.css
    │   │   ├── Dashboard.css
    │   │   ├── Orders.css
    │   │   ├── InventoryTable.css
    │   │   └── OrderForm.css
    │   ├── App.js
    │   ├── api.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    └── package.json
```

## 🚀 Setup Instructions

### 1. **Prepare MongoDB Connection String**

The MongoDB connection string is pre-configured:
```
mongodb+srv://tp680981_db_user:<db_password>@vvndressinventory.n4kbota.mongodb.net/?appName=vvndressinventory
```

**Replace `<db_password>` with the actual password in `.env` file.**

### 2. **Setup Backend**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Update .env file with MongoDB password
# Edit backend/.env and replace the password

# Start the backend server
npm start
```

Server will run on `https://vvndressinventory.onrender.com`

**Expected Output:**
```
✅ MongoDB connected successfully!
🚀 Server running on https://vvndressinventory.onrender.com
```

### 3. **Setup Frontend**

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

Frontend will automatically open on `http://localhost:3000`

## 🔐 Login Credentials

```
Username: admin123
Password: admin123
```

## 📊 Database Collections

### Inventory Schema
```javascript
{
  _id: ObjectId,
  name: String,           // e.g., "Summer Dress"
  category: String,       // e.g., "Casual"
  size: String,          // e.g., "M", "L", "XL"
  quantity: Number,      // Available stock
  price: Number,         // Item price
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  _id: ObjectId,
  items: [
    {
      inventoryId: ObjectId,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  status: String,        // "pending" or "returned"
  createdAt: Date,
  updatedAt: Date
}
```

## 🎮 Application Flow

### 1. **Login Page**
- Enter hardcoded credentials (admin123 / admin123)
- Session stored in localStorage
- Redirects to Dashboard

### 2. **Dashboard**
- View all inventory items in a table
- Add new dress items with form
- See stock status (In Stock, Low Stock, Out of Stock)
- Navigate to Orders page

### 3. **Orders Page**
- Create new orders by selecting items
- Inventory automatically deducted when order is placed
- View all orders with details
- Mark orders as "Returned" (restores inventory)

## 🔄 API Endpoints

### Inventory
- `GET /api/inventory` - Get all items
- `GET /api/inventory/:id` - Get item by ID
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/:id` - Update item quantity
- `DELETE /api/inventory/:id` - Delete item

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/return` - Mark order as returned

## 💡 Sample Data to Add

Add some sample items to test:

1. **Summer Dress**
   - Category: Casual
   - Size: M
   - Quantity: 10
   - Price: $29.99

2. **Evening Gown**
   - Category: Formal
   - Size: L
   - Quantity: 5
   - Price: $89.99

3. **Garden Dress**
   - Category: Casual
   - Size: S
   - Quantity: 15
   - Price: $39.99

4. **Cocktail Dress**
   - Category: Party
   - Size: M
   - Quantity: 8
   - Price: $59.99

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB connection string in `.env`
- Verify MongoDB password is correct
- Ensure IP whitelist on MongoDB Atlas includes your IP
- Check internet connection

### Frontend not connecting to backend
- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Browser console should show API calls to `https://vvndressinventory.onrender.com/api`

### Port already in use
- **For port 5000 (Backend):** 
  ```bash
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```
- **For port 3000 (Frontend):**
  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

### CORS Error
- Ensure CORS middleware is enabled in backend (already configured)
- Check API endpoint in `frontend/src/api.js`

## 📝 Key Features Explained

### 1. **Inventory Deduction on Order**
When creating an order:
- System checks if inventory has sufficient quantity
- If available, quantity is automatically deducted
- Order is saved with item details and total amount

### 2. **Return Processing**
When marking order as returned:
- All items in the order are restored to inventory
- Order status changed from "pending" to "returned"
- Inventory quantities increased by order quantities

### 3. **Authentication**
- Simple localStorage-based session management
- No JWT tokens (simplified for demo)
- Session persists until logout

## 🎨 UI/UX Features

- Gradient headers with smooth transitions
- Color-coded status badges
- Responsive design for mobile devices
- Loading states and success messages
- Form validation with error handling
- Table with hover effects and status indicators

## 🔧 Development

### Enable Dev Mode (Backend)
Replace `node server.js` with `nodemon server.js` (install nodemon first)

### Build for Production (Frontend)
```bash
cd frontend
npm run build
```

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Verify all dependencies are installed
3. Ensure .env file is properly configured
4. Check browser console for error messages

## 📄 License

This project is open source and available for educational purposes.

---

**Happy inventory managing! 📦✨**
