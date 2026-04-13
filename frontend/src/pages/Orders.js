// Orders Page
// Manage orders, create orders, and handle returns

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import { orderAPI, inventoryAPI } from '../api';
import '../styles/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      navigate('/');
    }
  }, [navigate]);

  // Fetch orders and inventory on component mount
  useEffect(() => {
    fetchOrdersAndInventory();
  }, []);

  const fetchOrdersAndInventory = async () => {
    try {
      setLoading(true);
      const [ordersRes, inventoryRes] = await Promise.all([
        orderAPI.getAll(),
        inventoryAPI.getAll()
      ]);
      setOrders(ordersRes.data);
      setInventory(inventoryRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleReturnOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to return this order?')) {
      try {
        await orderAPI.returnOrder(orderId);
        setSuccessMessage('✅ Order returned successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchOrdersAndInventory();
      } catch (error) {
        console.error('Error returning order:', error);
        alert('Failed to return order');
      }
    }
  };

  const handleOrderCreated = () => {
    setShowOrderForm(false);
    setSuccessMessage('✅ Order created successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    fetchOrdersAndInventory();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="orders-container">
      <header className="orders-header">
        <div>
          <h1>📋 Customer Orders</h1>
          <p>Manage orders and process returns</p>
        </div>
        <div className="header-buttons">
          <button onClick={() => navigate('/dashboard')} className="nav-btn">
            📦 Back to Inventory
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </header>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="orders-content">
        {/* Create Order Button */}
        <button
          onClick={() => setShowOrderForm(!showOrderForm)}
          className="toggle-form-btn"
        >
          {showOrderForm ? '✖️ Cancel' : '➕ Create New Order'}
        </button>

        {/* Order Form */}
        {showOrderForm && (
          <OrderForm
            inventory={inventory}
            onOrderCreated={handleOrderCreated}
            onCancel={() => setShowOrderForm(false)}
          />
        )}

        {/* Orders List */}
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders yet. Create your first order!</p>
          </div>
        ) : (
          <div className="orders-list">
            <h2>All Orders</h2>
            {orders.map((order) => (
              <div key={order._id} className={`order-card ${order.status}`}>
                <div className="order-header">
                  <div>
                    <h3>Order #{order._id.substring(0, 8)}</h3>
                    <p className="order-customer">👤 {order.customerName}</p>
                    <p className="order-date">
                      📅 {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Color</th>
                        <th>Section</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>{item.color}</td>
                          <td>{item.section}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="order-footer">
                  <div className="total-items">
                    <strong>Total Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)} units</strong>
                  </div>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleReturnOrder(order._id)}
                      className="return-btn"
                    >
                      🔄 Mark as Returned
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
