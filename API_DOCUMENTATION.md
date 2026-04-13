# API Documentation

Complete API reference for the Dress Shop Inventory Management System

## Base URL
```
http://localhost:5000/api
```

---

## Authentication
Currently, no authentication is required for API calls. The application uses a simple login system with hardcoded credentials stored in localStorage on the frontend.

**Frontend Login:**
- Username: `admin123`
- Password: `admin123`

---

## INVENTORY ENDPOINTS

### 1. Get All Inventory Items
**GET** `/inventory`

**Description:** Retrieve all dress items from the inventory.

**Response:**
```json
[
  {
    "_id": "65a7c3b2d5e9f1a2b3c4d5e6",
    "name": "Summer Beach Dress",
    "category": "Casual",
    "size": "M",
    "quantity": 20,
    "price": 29.99,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "65a7c3b2d5e9f1a2b3c4d5e7",
    "name": "Evening Gown",
    "category": "Formal",
    "size": "L",
    "quantity": 8,
    "price": 89.99,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
]
```

**Status:** 200 OK

---

### 2. Get Single Inventory Item
**GET** `/inventory/:id`

**Description:** Retrieve a specific inventory item by ID.

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the item

**Example:**
```
GET /api/inventory/65a7c3b2d5e9f1a2b3c4d5e6
```

**Response:**
```json
{
  "_id": "65a7c3b2d5e9f1a2b3c4d5e6",
  "name": "Summer Beach Dress",
  "category": "Casual",
  "size": "M",
  "quantity": 20,
  "price": 29.99,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Status:** 200 OK | 404 Not Found

---

### 3. Create New Inventory Item
**POST** `/inventory`

**Description:** Add a new dress item to the inventory.

**Request Body:**
```json
{
  "name": "Summer Beach Dress",
  "category": "Casual",
  "size": "M",
  "quantity": 20,
  "price": 29.99
}
```

**Required Fields:**
- `name` (string) - Item name
- `category` (string) - Category (e.g., Casual, Formal)
- `size` (string) - Size (e.g., S, M, L, XL)
- `quantity` (number) - Stock quantity
- `price` (number) - Item price

**Response:**
```json
{
  "_id": "65a7c3b2d5e9f1a2b3c4d5e6",
  "name": "Summer Beach Dress",
  "category": "Casual",
  "size": "M",
  "quantity": 20,
  "price": 29.99,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Status:** 201 Created | 400 Bad Request

---

### 4. Update Inventory Item Quantity
**PUT** `/inventory/:id`

**Description:** Update the quantity of an inventory item.

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the item

**Request Body:**
```json
{
  "quantity": 15
}
```

**Required Fields:**
- `quantity` (number) - New quantity value

**Response:**
```json
{
  "_id": "65a7c3b2d5e9f1a2b3c4d5e6",
  "name": "Summer Beach Dress",
  "category": "Casual",
  "size": "M",
  "quantity": 15,
  "price": 29.99,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-16T14:45:00.000Z"
}
```

**Status:** 200 OK | 400 Bad Request | 404 Not Found

---

### 5. Delete Inventory Item
**DELETE** `/inventory/:id`

**Description:** Remove an item from inventory.

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the item

**Example:**
```
DELETE /api/inventory/65a7c3b2d5e9f1a2b3c4d5e6
```

**Response:**
```json
{
  "message": "Item deleted successfully"
}
```

**Status:** 200 OK | 404 Not Found

---

## ORDER ENDPOINTS

### 1. Get All Orders
**GET** `/orders`

**Description:** Retrieve all orders from the system.

**Response:**
```json
[
  {
    "_id": "65a7c3b2d5e9f1a2b3c4d5f0",
    "items": [
      {
        "inventoryId": "65a7c3b2d5e9f1a2b3c4d5e6",
        "name": "Summer Beach Dress",
        "quantity": 3,
        "price": 29.99
      }
    ],
    "totalAmount": 89.97,
    "status": "pending",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
]
```

**Status:** 200 OK

---

### 2. Get Single Order
**GET** `/orders/:id`

**Description:** Retrieve a specific order by ID.

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the order

**Example:**
```
GET /api/orders/65a7c3b2d5e9f1a2b3c4d5f0
```

**Response:**
```json
{
  "_id": "65a7c3b2d5e9f1a2b3c4d5f0",
  "items": [
    {
      "inventoryId": "65a7c3b2d5e9f1a2b3c4d5e6",
      "name": "Summer Beach Dress",
      "quantity": 3,
      "price": 29.99
    }
  ],
  "totalAmount": 89.97,
  "status": "pending",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Status:** 200 OK | 404 Not Found

---

### 3. Create New Order
**POST** `/orders`

**Description:** Create a new order. This endpoint automatically deducts inventory quantities.

**Request Body:**
```json
{
  "items": [
    {
      "inventoryId": "65a7c3b2d5e9f1a2b3c4d5e6",
      "quantity": 3
    },
    {
      "inventoryId": "65a7c3b2d5e9f1a2b3c4d5e7",
      "quantity": 1
    }
  ]
}
```

**Required Fields:**
- `items` (array, required) - Array of items to order
  - `inventoryId` (string, required) - MongoDB ObjectId of inventory item
  - `quantity` (number, required) - Quantity to order

**Logic:**
1. Validates that all items exist in inventory
2. Checks if sufficient quantity is available for each item
3. If validation passes:
   - Creates order with calculated total
   - Deducts quantities from inventory
   - Saves order with status "pending"
4. If validation fails, returns error without making changes

**Response (Success):**
```json
{
  "_id": "65a7c3b2d5e9f1a2b3c4d5f0",
  "items": [
    {
      "inventoryId": "65a7c3b2d5e9f1a2b3c4d5e6",
      "name": "Summer Beach Dress",
      "quantity": 3,
      "price": 29.99
    }
  ],
  "totalAmount": 89.97,
  "status": "pending",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Response (Error - Insufficient Quantity):**
```json
{
  "message": "Insufficient quantity for Summer Beach Dress. Available: 5, Requested: 10"
}
```

**Status:** 201 Created | 400 Bad Request | 404 Not Found

---

### 4. Return Order
**PUT** `/orders/:id/return`

**Description:** Mark an order as returned and restore inventory quantities.

**Parameters:**
- `id` (string, required) - MongoDB ObjectId of the order

**Example:**
```
PUT /api/orders/65a7c3b2d5e9f1a2b3c4d5f0/return
```

**Logic:**
1. Finds the order by ID
2. Checks if order is already marked as returned
3. If not returned:
   - For each item in order, restores quantity to inventory
   - Updates order status to "returned"

**Response (Success):**
```json
{
  "message": "Order returned successfully",
  "order": {
    "_id": "65a7c3b2d5e9f1a2b3c4d5f0",
    "items": [
      {
        "inventoryId": "65a7c3b2d5e9f1a2b3c4d5e6",
        "name": "Summer Beach Dress",
        "quantity": 3,
        "price": 29.99
      }
    ],
    "totalAmount": 89.97,
    "status": "returned",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T15:30:00.000Z"
  }
}
```

**Response (Error - Already Returned):**
```json
{
  "message": "This order is already returned"
}
```

**Status:** 200 OK | 400 Bad Request | 404 Not Found

---

## HEALTH CHECK

### Health Status
**GET** `/health`

**Description:** Check if the server is running.

**Response:**
```json
{
  "message": "Server is running!"
}
```

**Status:** 200 OK

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Descriptive error message"
}
```

### 404 Not Found
```json
{
  "message": "Item not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

---

## Common Workflows

### Workflow 1: Create Order and View Result

1. **Get Inventory to Find Items**
   ```
   GET /api/inventory
   ```

2. **Create Order**
   ```
   POST /api/orders
   Body: {
     "items": [
       { "inventoryId": "...", "quantity": 3 }
     ]
   }
   ```

3. **Verify Inventory Deduction**
   ```
   GET /api/inventory/...
   ```
   (Note: quantity should be reduced by 3)

4. **View Order**
   ```
   GET /api/orders/...
   ```

---

### Workflow 2: Add Item and Check Quantity

1. **Create New Item**
   ```
   POST /api/inventory
   Body: {
     "name": "New Dress",
     "category": "Casual",
     "size": "M",
     "quantity": 10,
     "price": 49.99
   }
   ```

2. **Update Quantity**
   ```
   PUT /api/inventory/{id}
   Body: { "quantity": 15 }
   ```

3. **Verify**
   ```
   GET /api/inventory/{id}
   ```

---

### Workflow 3: Process Return

1. **View Order**
   ```
   GET /api/orders/{id}
   ```
   (Note status: "pending")

2. **Check Current Inventory**
   ```
   GET /api/inventory/{itemId}
   ```

3. **Return Order**
   ```
   PUT /api/orders/{id}/return
   ```

4. **Verify Inventory Restoration**
   ```
   GET /api/inventory/{itemId}
   ```
   (Note: quantity should be increased)

---

## Testing with cURL

### Get All Inventory
```bash
curl http://localhost:5000/api/inventory
```

### Create Item
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Dress",
    "category": "Casual",
    "size": "M",
    "quantity": 10,
    "price": 29.99
  }'
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      { "inventoryId": "65a7c3b2d5e9f1a2b3c4d5e6", "quantity": 3 }
    ]
  }'
```

### Return Order
```bash
curl -X PUT http://localhost:5000/api/orders/65a7c3b2d5e9f1a2b3c4d5f0/return \
  -H "Content-Type: application/json"
```

---

## Rate Limiting & Throttling

Currently, no rate limiting is implemented. In production, add:
- Requests per minute limits
- IP-based throttling
- User-based rate limiting

---

## Security Notes

⚠️ **For Production:**
- Add authentication (JWT tokens)
- Validate all input data
- Implement HTTPS
- Add rate limiting
- Log all API calls
- Sanitize data inputs
- Use environment variables for config

---

## Frontend Integration

### Axios Configuration (in `frontend/src/api.js`)

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const inventoryAPI = {
  getAll: () => api.get('/inventory'),
  create: (data) => api.post('/inventory', data),
  // ... more methods
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  // ... more methods
};
```

---

## Changelog

**v1.0.0** (Initial Release)
- Complete CRUD operations for inventory
- Order creation with inventory deduction
- Order return functionality
- Basic error handling
- MongoDB integration

---

**API Version:** 1.0.0  
**Last Updated:** January 2024  
**Backend Framework:** Express.js  
**Database:** MongoDB Atlas
