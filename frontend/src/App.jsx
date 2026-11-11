import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import {
  request,
  authHeaders,
} from "./api";
import { selectUser, userSet, userCleared } from "./store/authSlice";
import { selectTasks, tasksLoaded, tasksCleared } from "./store/tasksSlice";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const tasks = useSelector(selectTasks);

  const [authMode, setAuthMode] =
    useState("login");

  const [loading, setLoading] = useState(() =>
    Boolean(localStorage.getItem("taskflow_token"))
  );

  useEffect(() => {
    if (!localStorage.getItem("taskflow_token")) {
      return;
    }

    async function loadSession() {
      try {
        const { user } = await request("/auth/me", {
          headers: authHeaders(),
        });

        const { tasks } = await request("/tasks", {
          headers: authHeaders(),
        });

        dispatch(userSet(user));
        dispatch(tasksLoaded(tasks));
      } catch {
        localStorage.removeItem("taskflow_token");
        dispatch(userCleared());
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [dispatch]);

  async function handleAuthenticated(
    authenticatedUser
  ) {
    dispatch(userSet(authenticatedUser));

    try {
      const { tasks } =
        await request("/tasks", {
          headers: authHeaders(),
        });

      dispatch(tasksLoaded(tasks));
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    localStorage.removeItem(
      "taskflow_token"
    );

    dispatch(userCleared());
    dispatch(tasksCleared());
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
      onLogout={logout}
    />
  );
}