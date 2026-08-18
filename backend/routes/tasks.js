const express = require('express');
const Task = require('../models/Task');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const editableFields = ['title', 'category', 'priority', 'dueDate', 'completed'];

function taskInput(body, partial = false) {
  const data = {};
  for (const field of editableFields) if (Object.hasOwn(body, field)) data[field] = body[field];
  if (partial && Object.keys(data).length === 0) return { error: 'Provide at least one field to update.' };
  if (!partial && (!String(data.title || '').trim() || !data.dueDate)) return { error: 'A title and due date are required.' };
  if (data.title !== undefined) {
    data.title = String(data.title).trim();
    if (!data.title || data.title.length > 140) return { error: 'Task titles must be between 1 and 140 characters.' };
  }
  if (data.dueDate !== undefined && Number.isNaN(new Date(data.dueDate).valueOf())) return { error: 'Use a valid due date.' };
  if (data.category !== undefined && !['Work', 'Personal', 'Urgent'].includes(data.category)) return { error: 'Choose a valid category.' };
  if (data.priority !== undefined && !['High', 'Medium', 'Low'].includes(data.priority)) return { error: 'Choose a valid priority.' };
  if (data.completed !== undefined && typeof data.completed !== 'boolean') return { error: 'Completed must be true or false.' };
  return { data };
}

router.use(requireAuth);
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ completed: 1, dueDate: 1, createdAt: -1 });
    return res.json({ tasks });
  } catch (error) { return next(error); }
});
router.post('/', async (req, res, next) => {
  try {
    const { data, error } = taskInput(req.body);
    if (error) return res.status(400).json({ message: error });
    const task = await Task.create({ ...data, user: req.user._id });
    return res.status(201).json({ task });
  } catch (error) { return next(error); }
});
router.patch('/:id', async (req, res, next) => {
  try {
    const { data, error } = taskInput(req.body, true);
    if (error) return res.status(400).json({ message: error });
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, data, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    return res.json({ task });
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Task not found.' });
    return next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    return res.status(204).end();
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Task not found.' });
    return next(error);
  }
});

module.exports = router;
