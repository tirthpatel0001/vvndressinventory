// Order Form Component
// Form to create orders by selecting items from inventory

import React, { useState } from 'react';
import { orderAPI } from '../api';
import '../styles/OrderForm.css';

function OrderForm({ inventory, onOrderCreated, onCancel }) {
  const [customerName, setCustomerName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterSection, setFilterSection] = useState('');

  // Get unique values for dropdowns
  const categories = [...new Set(inventory.map(item => item.category))].filter(Boolean).sort();
  const colors = [...new Set(inventory.map(item => item.color))].filter(Boolean).sort();
  const sections = [...new Set(inventory.map(item => item.section))].filter(Boolean).sort();

  // Filter inventory based on selected filters
  const filteredInventory = inventory.filter(item => {
    return (
      (!filterCategory || item.category === filterCategory) &&
      (!filterColor || item.color === filterColor) &&
      (!filterSection || item.section === filterSection)
    );
  });

  const handleAddItem = () => {
    setSelectedItems([
      ...selectedItems,
      { inventoryId: '', quantity: 1 }
    ]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...selectedItems];
    newItems[index][field] = value;
    setSelectedItems(newItems);
  };

  const calculateTotalItems = () => {
    return selectedItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    // Validate all items are selected and quantities are valid
    for (const item of selectedItems) {
      if (!item.inventoryId) {
        alert('Please select an item for all rows');
        return;
      }
      if (item.quantity <= 0) {
        alert('Quantity must be greater than 0');
        return;
      }
    }

    try {
      setLoading(true);
      await orderAPI.create({ items: selectedItems, customerName });
      alert('✅ Order created successfully!');
      onOrderCreated();
    } catch (error) {
      console.error('Error creating order:', error);
      alert(error.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <form onSubmit={handleCreateOrder}>
        <h3>✨ Create New Order</h3>

        {/* Customer Name Field */}
        <div className="customer-section">
          <div className="form-group">
            <label>Customer Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h4>Filter Items</h4>
          <div className="filter-row">
            <div className="filter-group">
              <label>Category</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Color</label>
              <select value={filterColor} onChange={(e) => setFilterColor(e.target.value)}>
                <option value="">All Colors</option>
                {colors.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Section</label>
              <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
                <option value="">All Sections</option>
                {sections.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="order-items-section">
          <table className="order-items-table">
            <thead>
              <tr>
                <th>Select Item</th>
                <th>Category</th>
                <th>Color</th>
                <th>Section</th>
                <th>Available Stock</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => {
                const inventoryItem = inventory.find(inv => inv._id === item.inventoryId);

                return (
                  <tr key={index}>
                    <td>
                      <select
                        value={item.inventoryId}
                        onChange={(e) => handleItemChange(index, 'inventoryId', e.target.value)}
                        required
                      >
                        <option value="">-- Select Item --</option>
                        {filteredInventory.map((inv) => (
                          <option key={inv._id} value={inv._id}>
                            {inv.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{inventoryItem ? inventoryItem.category : '-'}</td>
                    <td>{inventoryItem ? inventoryItem.color : '-'}</td>
                    <td>{inventoryItem ? inventoryItem.section : '-'}</td>
                    <td className="stock-cell">
                      {inventoryItem ? inventoryItem.quantity : 0}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max={inventoryItem ? inventoryItem.quantity : 0}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                        required
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="remove-btn"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            type="button"
            onClick={handleAddItem}
            className="add-item-btn"
          >
            ➕ Add Item
          </button>
        </div>

        <div className="order-summary">
          <div className="total-section">
            <h4>Total Items: {calculateTotalItems()} units</h4>
            {customerName && <p>Customer: <strong>{customerName}</strong></p>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? 'Creating...' : '✅ Create Order'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
            >
              ✖️ Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
