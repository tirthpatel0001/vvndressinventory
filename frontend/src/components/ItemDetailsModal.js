import React from 'react';
import '../styles/ItemDetailsModal.css';

function ItemDetailsModal({ item, isOpen, onClose, onAddQuantity, onRemoveQuantity, isLoading }) {
  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📦 Item Details</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <label>Item Description:</label>
            <p>{item.name}</p>
          </div>

          <div className="detail-row">
            <label>Category:</label>
            <p>{item.category}</p>
          </div>

          <div className="detail-row">
            <label>Section:</label>
            <p>{item.section}</p>
          </div>

          <div className="detail-row">
            <label>Color:</label>
            <p>{item.color}</p>
          </div>

          <div className="detail-row">
            <label>Current Quantity:</label>
            <p className={item.quantity <= 5 ? 'low-stock' : 'in-stock'}>
              {item.quantity} units {item.quantity <= 5 && '⚠️ Low Stock'}
            </p>
          </div>

          <div className="detail-row">
            <label>Price:</label>
            <p>₹{item.price || 'N/A'}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-add"
            onClick={() => onAddQuantity(item._id)}
            disabled={isLoading}
          >
            {isLoading ? '⏳ Processing...' : '➕ Add Quantity'}
          </button>
          <button
            className="btn-remove"
            onClick={() => onRemoveQuantity(item._id)}
            disabled={isLoading}
          >
            {isLoading ? '⏳ Processing...' : '➖ Remove Quantity'}
          </button>
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsModal;
