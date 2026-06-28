const Task = require('../models/Task');
const Subtask = require('../models/Subtask');

// GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ deadline: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("GET TASKS ERROR:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    console.log("========== CREATE TASK ==========");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const {
      title,
      description,
      deadline,
      priority,
      estimatedHours,
      excuseReason,
    } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Title and deadline are required",
      });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      deadline,
      priority,
      estimatedHours,
      excuseReason,
    });

    console.log("Task Created:", task);

    res.status(201).json({
      success: true,
      task,
    });

  } catch (err) {
    console.error("CREATE TASK ERROR");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    Object.assign(task, req.body);

    await task.save();

    res.json(task);
  } catch (err) {
    console.error("UPDATE ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Subtask.deleteMany({
      task: task._id,
    });

    res.json({
      message: "Task deleted",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};