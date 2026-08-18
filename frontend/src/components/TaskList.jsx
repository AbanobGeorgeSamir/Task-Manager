import {
  CheckIcon,
  CalendarIcon,
  CloseIcon,
} from "./Icons";
import { formatDate } from "../utils/helpers";

export default function TaskList({
  tasks,
  search,
  category,
  priority,
  onToggle,
  onDelete,
  onNewTask,
}) {
  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      category === "all" ||
      task.category === category;

    const priorityMatch =
      priority === "all" ||
      task.priority === priority;

    const searchMatch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return (
      categoryMatch &&
      priorityMatch &&
      searchMatch
    );
  });

  if (!filteredTasks.length) {
    const filtered =
      search ||
      category !== "all" ||
      priority !== "all";

    return (
      <div className="empty-state">
        <div>
          <CheckIcon />
        </div>

        <h2>
          {filtered
            ? "Nothing matches this view"
            : "Your canvas is clear"}
        </h2>

        <p>
          {search
            ? "Try another search phrase."
            : "Create a task to give your day a gentle start."}
        </p>

        {!filtered && (
          <button
            className="button secondary"
            onClick={onNewTask}
          >
            Plan your first task
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {filteredTasks.map((task) => (
        <article
          className={`task ${
            task.completed ? "done" : ""
          }`}
          key={task._id}
        >
          <button
            className="task-check"
            onClick={() => onToggle(task)}
            aria-label={`Mark ${task.title} ${
              task.completed
                ? "incomplete"
                : "complete"
            }`}
          >
            {task.completed && <CheckIcon />}
          </button>

          <div className="task-content">
            <h2>{task.title}</h2>

            <div className="task-meta">
              <span
                className={`tag ${task.category.toLowerCase()}`}
              >
                {task.category}
              </span>

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

              <span>
                <CalendarIcon />
                {formatDate(task.dueDate)}
              </span>
            </div>
          </div>

          <button
            className="delete-task"
            onClick={() => onDelete(task._id)}
            aria-label={`Delete ${task.title}`}
          >
            <CloseIcon />
          </button>
        </article>
      ))}
    </>
  );
}