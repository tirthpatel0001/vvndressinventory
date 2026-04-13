// Order Model
// Schema for customer orders

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    items: [
      {
        inventoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Inventory',
          required: true
        },
        name: String,
        category: String,
        color: String,
        section: String,
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'returned'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
