const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    deadline: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    estimatedHours: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed', 'missed'],
      default: 'not_started',
    },
    panicScore: { type: Number, default: 0 }, // calculated server-side, Phase 2
    progress: { type: Number, default: 0, min: 0, max: 100 },
    excuseReason: {
      type: String,
      enum: ['procrastination', 'social_media', 'lack_of_clarity', 'too_large', 'burnout', null],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);