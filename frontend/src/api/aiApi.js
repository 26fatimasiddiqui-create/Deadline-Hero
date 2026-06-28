import api from './axios';

export async function fetchPrioritizedTasks(tasks) {
  const { data } = await api.post('/ai/prioritize', { tasks });
  return data.rankedTasks;
}