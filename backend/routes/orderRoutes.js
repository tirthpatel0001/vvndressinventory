// Order Routes
// API endpoints for order management

import express from 'express';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.inventoryId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// GET single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.inventoryId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

// POST create new order
router.post('/', async (req, res) => {
  try {
    const { items, customerName } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ message: 'Customer name is required' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Check availability and prepare items
    for (const item of items) {
      const inventoryItem = await Inventory.findById(item.inventoryId);

      if (!inventoryItem) {
        return res.status(404).json({ message: `Item ${item.inventoryId} not found` });
      }

      if (inventoryItem.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient quantity for ${inventoryItem.name}. Available: ${inventoryItem.quantity}, Requested: ${item.quantity}`
        });
      }

      orderItems.push({
        inventoryId: item.inventoryId,
        name: inventoryItem.name,
        category: inventoryItem.category,
        color: inventoryItem.color,
        section: inventoryItem.section,
        quantity: item.quantity
      });

      // Deduct quantity from inventory
      inventoryItem.quantity -= item.quantity;
      await inventoryItem.save();
    }

    // Create order
    const newOrder = new Order({
      customerName: customerName.trim(),
      items: orderItems,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// PUT return order
router.put('/:id/return', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'returned') {
      return res.status(400).json({ message: 'This order is already returned' });
    }

    // Restore quantities to inventory
    for (const item of order.items) {
      const inventoryItem = await Inventory.findById(item.inventoryId);
      if (inventoryItem) {
        inventoryItem.quantity += item.quantity;
        await inventoryItem.save();
      }
    }

    // Update order status
    order.status = 'returned';
    await order.save();

    res.json({ message: 'Order returned successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error returning order', error: error.message });
  }
});

export default router;
