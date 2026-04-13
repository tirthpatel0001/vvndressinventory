// Excel-Style Inventory Table Component
// Displays inventory matching Excel structure: sr no., section, item desc, item type, color, qty

import React, { useState } from 'react';
import { inventoryAPI } from '../api';
import '../styles/ExcelInventoryTable.css';

function ExcelInventoryTable({ inventory, onRefresh, onNavigateToOrders }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  // Filter inventory based on search
  const filteredInventory = inventory.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchLower) ||
      item.category?.toLowerCase().includes(searchLower) ||
      item.color?.toLowerCase().includes(searchLower)
    );
  });

  const handleAddQuantity = async (itemId) => {
    const qty = prompt('Enter quantity to add:');
    if (qty && !isNaN(qty) && parseInt(qty) > 0) {
      setActionLoading(itemId);
      try {
        const item = inventory.find(i => i._id === itemId);
        await inventoryAPI.update(itemId, { quantity: item.quantity + parseInt(qty) });
        onRefresh();
      } catch (error) {
        alert('Failed to add quantity');
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleRemoveQuantity = async (itemId) => {
    const qty = prompt('Enter quantity to remove:');
    if (qty && !isNaN(qty) && parseInt(qty) > 0) {
      setActionLoading(itemId);
      try {
        const item = inventory.find(i => i._id === itemId);
        const newQty = Math.max(0, item.quantity - parseInt(qty));
        await inventoryAPI.update(itemId, { quantity: newQty });
        onRefresh();
      } catch (error) {
        alert('Failed to remove quantity');
      } finally {
        setActionLoading(null);
      }
    }
  };

  return (
    <div className="inventory-table-container">
      <div className="table-header">
        <h2>📦 Dress Shop Inventory</h2>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by item name, type, or color..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="inventory-table excel-table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Section</th>
            <th>Item Description</th>
            <th>Item Type</th>
            <th>Color</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item, index) => (
            <tr key={item._id} className={item.quantity <= 5 ? 'low-stock' : ''}>
              <td className="sr-no">{index + 1}</td>
              <td className="section">{item.section}</td>
              <td className="item-desc"><strong>{item.name}</strong></td>
              <td className="item-type">{item.category}</td>
              <td className="color">{item.color}</td>
              <td className="qty-cell">{item.quantity}</td>
              <td className="actions">
                <button
                  className="add-btn"
                  onClick={() => handleAddQuantity(item._id)}
                  disabled={actionLoading === item._id}
                  title="Add quantity"
                >
                  ➕ Add
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveQuantity(item._id)}
                  disabled={actionLoading === item._id}
                  title="Remove quantity"
                >
                  ➖ Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <p>Total Items: <strong>{filteredInventory.length}</strong> / {inventory.length}</p>
        <p>Total Quantity: <strong>{filteredInventory.reduce((sum, item) => sum + item.quantity, 0)}</strong> units</p>
        <button onClick={onNavigateToOrders} className="create-order-btn">
          📋 Create Order
        </button>
      </div>
    </div>
  );
}

export default ExcelInventoryTable;
