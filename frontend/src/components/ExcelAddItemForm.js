// Excel-Style Add Item Form Component
// Form matching Excel structure: sr no., section, item desc, item type, color, qty

import React, { useState } from 'react';
import '../styles/ExcelAddItemForm.css';

function ExcelAddItemForm({ onAddItem, onCancel }) {
  const [formData, setFormData] = useState({
    section: '',
    itemDesc: '',
    itemType: '',
    color: '',
    qty: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.section || !formData.itemDesc || !formData.itemType || !formData.color || !formData.qty) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await onAddItem({
        name: formData.itemDesc,
        category: formData.itemType,
        color: formData.color,
        quantity: parseInt(formData.qty),
        section: formData.section
      });

      setFormData({
        section: '',
        itemDesc: '',
        itemType: '',
        color: '',
        qty: ''
      });
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="excel-add-item-form">
      <h3>➕ Add New Dress Item</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Section *</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            placeholder="e.g., 1/1, 1/2, 2/3"
            required
          />
        </div>

        <div className="form-group">
          <label>Item Description *</label>
          <input
            type="text"
            name="itemDesc"
            value={formData.itemDesc}
            onChange={handleInputChange}
            placeholder="e.g., classical upvastra"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Item Type *</label>
          <input
            type="text"
            name="itemType"
            value={formData.itemType}
            onChange={handleInputChange}
            placeholder="e.g., top, bottom, pair, headwear"
            required
          />
        </div>

        <div className="form-group">
          <label>Color *</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            placeholder="e.g., rama, purple, maroon"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Quantity *</label>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleInputChange}
            placeholder="e.g., 7"
            min="1"
            required
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? '⏳ Adding...' : '✅ Add Item'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          ✖️ Cancel
        </button>
      </div>
    </form>
  );
}

export default ExcelAddItemForm;
