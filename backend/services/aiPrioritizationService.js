const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function buildPrompt(tasks) {
  const today = new Date().toISOString();

  const taskList = tasks
    .map((t, i) => `
${i + 1}.
_id: ${t._id}
title: ${t.title}
description: ${t.description || ""}
deadline: ${t.deadline || ""}
priority: ${t.priority || "medium"}
estimatedHours: ${t.estimatedHours || 1}
`)
    .join("\n");

  return `
Today's date is ${today}.

Rank these tasks by urgency and importance.

${taskList}

Return ONLY JSON in this format:

{
  "rankedTasks":[
    {
      "_id":"...",
      "rank":1,
      "suggestedPriority":"high",
      "reason":"..."
    }
  ]
}
`;
}

async function prioritizeTasks(tasks) {
  const prompt = buildPrompt(tasks);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const parsed = JSON.parse(response.text);

  return parsed.rankedTasks;
}

module.exports = {
  prioritizeTasks,
  buildPrompt,
};