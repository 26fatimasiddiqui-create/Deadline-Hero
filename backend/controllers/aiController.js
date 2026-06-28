const { prioritizeTasks } = require('../services/aiPrioritizationService');

// POST /api/ai/prioritize
const prioritizeTasksController = async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: "Please provide a non-empty 'tasks' array" });
    }

    const invalidTask = tasks.find((t) => !t || !t._id || !t.title);
    if (invalidTask) {
      return res.status(400).json({ message: "Every task must have at least an '_id' and a 'title'" });
    }

    const rankedTasks = await prioritizeTasks(tasks);
    res.json({ rankedTasks });
  } catch (err) {
    console.error('[aiController] prioritizeTasks failed:', err.message);
    res.status(502).json({ message: 'AI prioritization failed. Please try again shortly.', error: err.message });
  }
};

module.exports = { prioritizeTasksController };