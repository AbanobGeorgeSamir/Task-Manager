import { useState } from "react";
import {
  CloseIcon,
  ArrowIcon,
} from "./Icons";

export default function TaskModal({
  onClose,
  onCreate,
}) {
  const [form, setForm] = useState({
    title: "",
    category: "Work",
    priority: "Medium",
    dueDate: new Date()
      .toISOString()
      .slice(0, 10),
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      await onCreate(form);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <form
        className="modal"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        <span className="overline">
          NEW INTENTION
        </span>

        <h2>
          What would you like to make happen?
        </h2>

        <label>
          Task title

          <input
            name="title"
            maxLength={140}
            placeholder="e.g. Send the project brief"
            value={form.title}
            onChange={handleChange}
            autoFocus
            required
          />
        </label>

        <div className="modal-grid">
          <label>
            Category

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Urgent</option>
            </select>
          </label>

          <label>
            Priority

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Medium</option>
              <option>High</option>
              <option>Low</option>
            </select>
          </label>
        </div>

        <label>
          Due date

          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </label>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className="button ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="button primary"
            type="submit"
          >
            Add task
            <ArrowIcon />
          </button>
        </div>
      </form>
    </div>
  );
}