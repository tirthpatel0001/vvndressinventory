import React, { useState } from 'react';
import { inventoryAPI } from '../api';
import ItemDetailsModal from './ItemDetailsModal';
import '../styles/ExcelInventoryTable.css';

function ExcelInventoryTable({ inventory = [], onRefresh, onNavigateToOrders }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 🔥 SAFE FILTER (VERY IMPORTANT FIX)
  const filteredInventory = Array.isArray(inventory)
    ? inventory.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return (
          item?.name?.toLowerCase().includes(searchLower) ||
          item?.category?.toLowerCase().includes(searchLower) ||
          item?.color?.toLowerCase().includes(searchLower)
        );
      })
    : [];

  const handleAddQuantity = async (itemId) => {
    const qty = prompt('Enter quantity to add:');
    if (qty && !isNaN(qty) && parseInt(qty) > 0) {
      setActionLoading(itemId);
      try {
        const item = inventory.find(i => i._id === itemId);
        await inventoryAPI.update(itemId, { quantity: item.quantity + parseInt(qty) });
        onRefresh();
        setModalOpen(false);
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
        setModalOpen(false);
      } catch (error) {
        alert('Failed to remove quantity');
      } finally {
        setActionLoading(null);
      }
    }
  };

  const openItemDetails = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
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

      {/* 🔥 IMPORTANT DEBUG */}
      {inventory.length === 0 && (
        <p style={{ color: "yellow" }}>⚠️ No data received from API</p>
      )}

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
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.section}</td>
              <td>
                <button onClick={() => openItemDetails(item)}>
                  {item.name}
                </button>
              </td>
              <td>{item.category}</td>
              <td>{item.color}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleAddQuantity(item._id)}>➕</button>
                <button onClick={() => handleRemoveQuantity(item._id)}>➖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Total Items: {filteredInventory.length}</p>
        <p>Total Quantity: {filteredInventory.reduce((sum, item) => sum + item.quantity, 0)}</p>
        <button onClick={onNavigateToOrders}>
          📋 Create Order
        </button>
      </div>

      <ItemDetailsModal
        item={selectedItem}
        isOpen={modalOpen}
        onClose={closeModal}
        onAddQuantity={handleAddQuantity}
        onRemoveQuantity={handleRemoveQuantity}
        isLoading={actionLoading === selectedItem?._id}
      />
    </div>
  );
}

export default ExcelInventoryTable;