import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function Analytics() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const completed = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status !== "completed"
  ).length;

  const overdue = tasks.filter(
    (t) =>
      t.status !== "completed" &&
      new Date(t.deadline) < new Date()
  ).length;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Overdue", value: overdue },
  ];

  const priorityData = [
    {
      name: "Low",
      value: tasks.filter((t) => t.priority === "low").length,
    },
    {
      name: "Medium",
      value: tasks.filter((t) => t.priority === "medium").length,
    },
    {
      name: "High",
      value: tasks.filter((t) => t.priority === "high").length,
    },
  ];

return (
  <DashboardLayout
    sidebar={<Sidebar />}
    navbar={<Navbar />}
  >
    <div className="mx-auto max-w-7xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400">
          Visual overview of your productivity
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-slate-900 p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Task Status
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Priority Distribution
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
    </DashboardLayout>

  );
}