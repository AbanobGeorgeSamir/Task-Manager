import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import {
  request,
  authHeaders,
} from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [authMode, setAuthMode] =
    useState("login");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    const token =
      localStorage.getItem(
        "taskflow_token"
      );

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { user } =
        await request("/auth/me", {
          headers: authHeaders(),
        });

      const { tasks } =
        await request("/tasks", {
          headers: authHeaders(),
        });

      setUser(user);
      setTasks(tasks);
    } catch {
      localStorage.removeItem(
        "taskflow_token"
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleAuthenticated(
    authenticatedUser
  ) {
    setUser(authenticatedUser);

    try {
      const { tasks } =
        await request("/tasks", {
          headers: authHeaders(),
        });

      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    localStorage.removeItem(
      "taskflow_token"
    );

    setUser(null);
    setTasks([]);
    setAuthMode("login");
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          taskflow
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Auth
        mode={authMode}
        onModeChange={setAuthMode}
        onAuthenticated={
          handleAuthenticated
        }
      />
    );
  }

  return (
    <Dashboard
      user={user}
      tasks={tasks}
      setTasks={setTasks}
      onLogout={logout}
    />
  );
}