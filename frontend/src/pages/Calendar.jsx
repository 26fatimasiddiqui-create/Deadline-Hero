import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../calendar.css";

import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const selectedDate = new Date(date).toDateString();

  const tasksForDay = tasks.filter(
    (task) =>
      new Date(task.deadline).toDateString() === selectedDate
  );

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-3xl font-bold text-white">
          Calendar
        </h1>

        <p className="mb-8 text-slate-400">
          View all task deadlines
        </p>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl bg-slate-900 p-6">
            <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date, view }) => {
                if (view !== "month") return null;

                const task = tasks.find(
                (t) =>
                    new Date(t.deadline).toDateString() ===
                    date.toDateString()
                );

                if (!task) return null;

                let color = "#22c55e";

                if (task.status !== "completed") {
                if (new Date(task.deadline) < new Date()) {
                    color = "#ef4444";
                } else {
                    color = "#f59e0b";
                 }
             }

            return (
                <div className="mt-1 flex justify-center">
                  <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      </div>
    );
  }}
/>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Tasks on {selectedDate}
            </h2>

            {tasksForDay.length === 0 ? (
              <p className="text-slate-400">
                No tasks for this day.
              </p>
            ) : (
              <div className="space-y-3">
                {tasksForDay.map((task) => (
                  <div
                    key={task._id}
                    className="rounded-xl border border-slate-700 p-4"
                  >
                    <h3 className="font-semibold text-white">
                      {task.title}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {task.description}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(task.deadline).toLocaleString()}
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
                        task.priority === "high"
                          ? "bg-red-500/20 text-red-300"
                          : task.priority === "medium"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {task.priority}
                    </span>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}