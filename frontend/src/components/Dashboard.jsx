import { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import {
  PlusIcon,
  SearchIcon,
} from "./Icons";

import {
  request,
  authHeaders,
} from "../api";

import { formatDate } from "../utils/helpers";

export default function Dashboard({
  user,
  tasks,
  setTasks,
  onLogout,
}) {
  const [category, setCategory] =
    useState("all");

  const [priority, setPriority] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const completed = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  const percentage = tasks.length
    ? Math.round(
        (completed.length / tasks.length) * 100
      )
    : 0;

  const nextDue = useMemo(() => {
    const next = tasks
      .filter((task) => !task.completed)
      .sort(
        (a, b) =>
          new Date(a.dueDate) -
          new Date(b.dueDate)
      )[0];

    return next
      ? formatDate(next.dueDate)
      : "All clear";
  }, [tasks]);

  async function toggleTask(task) {
    try {
      const { task: updatedTask } =
        await request(`/tasks/${task._id}`, {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify({
            completed: !task.completed,
          }),
        });

      setTasks((current) =>
        current.map((item) =>
          item._id === task._id
            ? updatedTask
            : item
        )
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteTask(id) {
    try {
      await request(`/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      setTasks((current) =>
        current.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function createTask(data) {
    const { task } = await request(
      "/tasks",
      {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      }
    );

    setTasks((current) => [
      task,
      ...current,
    ]);

    setModalOpen(false);
  }

  return (
    <>
      <div className="dashboard">
        <Sidebar
          user={user}
          tasks={tasks}
          category={category}
          onCategoryChange={setCategory}
          onLogout={onLogout}
        />

        <main className="workspace">
          <header className="workspace-head">
            <div>
              <p className="overline">
                YOUR WORKSPACE
              </p>

              <h1>
                Today’s focus<span>.</span>
              </h1>

              <p className="subheading">
                Small steps, meaningful progress.
              </p>
            </div>

            <button
              className="button primary"
              onClick={() => setModalOpen(true)}
            >
              <PlusIcon />
              New task
            </button>
          </header>

          <section className="insights">
            <div className="progress-block">
              <div className="progress-copy">
                <p>Daily progress</p>

                <strong>
                  {percentage}%
                </strong>

                <span>
                  {completed.length} of{" "}
                  {tasks.length} tasks complete
                </span>
              </div>

              <div
                className="progress-ring"
                style={{
                  "--progress": percentage,
                }}
              >
                <span>
                  {percentage}%
                </span>
              </div>
            </div>

            <div className="stat">
              <span>OPEN TASKS</span>

              <strong>
                {tasks.length -
                  completed.length}
              </strong>

              <p>
                Ready when you are
              </p>
            </div>

            <div className="stat accent">
              <span>UP NEXT</span>

              <strong>
                {nextDue}
              </strong>

              <p>
                Closest due date
              </p>
            </div>
          </section>

          <section className="task-section">
            <div className="task-toolbar">
              <div className="search">
                <SearchIcon />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search your tasks"
                />
              </div>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target.value
                  )
                }
                aria-label="Filter by priority"
              >
                <option value="all">
                  All priorities
                </option>

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>
            </div>

            <div className="task-list">
              <TaskList
                tasks={tasks}
                search={search}
                category={category}
                priority={priority}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onNewTask={() =>
                  setModalOpen(true)
                }
              />
            </div>
          </section>
        </main>
      </div>

      {modalOpen && (
        <TaskModal
          onClose={() =>
            setModalOpen(false)
          }
          onCreate={createTask}
        />
      )}
    </>
  );
}