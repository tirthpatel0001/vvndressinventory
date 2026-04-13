import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExcelInventoryTable from '../components/ExcelInventoryTable';
import ExcelAddItemForm from '../components/ExcelAddItemForm';
import { inventoryAPI } from '../api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // 🔐 Check authentication
  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      navigate('/');
    }
  }, [navigate]);

  // 🚀 Fetch inventory on load
  useEffect(() => {
    fetchInventory();
  }, []);

  // 🔥 FIXED FUNCTION
  const fetchInventory = async () => {
    try {
      setLoading(true);

      console.log("📡 Calling API...");

      const response = await inventoryAPI.getAll();

      console.log("✅ API RESPONSE:", response);
      console.log("✅ DATA:", response.data);

      if (response && response.data && Array.isArray(response.data)) {
        setInventory([...response.data]); // force update
      } else {
        console.log("❌ Invalid data format");
        setInventory([]);
      }

    } catch (error) {
      console.error('❌ Error fetching inventory:', error);
      alert('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add item
  const handleAddItem = async (itemData) => {
    try {
      await inventoryAPI.create(itemData);
      setSuccessMessage('✅ Item added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowForm(false);
      fetchInventory();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>📦 Dress Shop Inventory</h1>
          <p>Manage your inventory efficiently</p>
        </div>
        <div className="header-buttons">
          <button onClick={() => navigate('/orders')} className="nav-btn">
            📋 View Orders
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </header>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="dashboard-content">
        {/* Add Item Form */}
        <div className="form-section">
          <button
            onClick={() => setShowForm(!showForm)}
            className="toggle-form-btn"
          >
            {showForm ? '✖️ Hide Form' : '➕ Add New Item'}
          </button>

          {showForm && (
            <ExcelAddItemForm
              onAddItem={handleAddItem}
              onCancel={() => setShowForm(false)}
            />
          )}
        </div>

        {/* Inventory Table */}
        {loading ? (
          <div className="loading">
            Loading inventory... (wait 20–30 sec first time)
          </div>
        ) : inventory.length === 0 ? (
          <div className="empty-state">
            <p>No inventory items yet. Add your first dress!</p>
          </div>
        ) : (
          <ExcelInventoryTable
            inventory={inventory}
            onRefresh={fetchInventory}
            onNavigateToOrders={() => navigate('/orders')}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;