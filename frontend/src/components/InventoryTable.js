// Inventory Table Component
// Displays inventory items in a table format

import React from 'react';
import '../styles/InventoryTable.css';

function InventoryTable({ inventory, onRefresh, onNavigateToOrders }) {
  return (
    <div className="inventory-table-container">
      <div className="table-header">
        <h2>📊 Current Inventory</h2>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Stock Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id} className={item.quantity <= 5 ? 'low-stock' : ''}>
              <td><strong>{item.name}</strong></td>
              <td>{item.category}</td>
              <td>{item.size}</td>
              <td className="quantity-cell">{item.quantity}</td>
              <td className="price-cell">${item.price.toFixed(2)}</td>
              <td>
                {item.quantity === 0 ? (
                  <span className="badge out-of-stock">Out of Stock</span>
                ) : item.quantity <= 5 ? (
                  <span className="badge low-stock">Low Stock</span>
                ) : (
                  <span className="badge in-stock">In Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <p>Total Items: <strong>{inventory.length}</strong></p>
        <p>Total Quantity: <strong>{inventory.reduce((sum, item) => sum + item.quantity, 0)}</strong></p>
        <button onClick={onNavigateToOrders} className="create-order-btn">
          📋 Create Order
        </button>
      </div>
    </div>
  );
}

export default InventoryTable;
