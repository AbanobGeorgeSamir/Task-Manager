import Logo from "./Logo";
import { LogoutIcon } from "./Icons";
import { initials } from "../utils/helpers";

export default function Sidebar({
  user,
  tasks,
  category,
  onCategoryChange,
  onLogout,
}) {
  const categories = [
    "all",
    "Work",
    "Personal",
    "Urgent",
  ];

  return (
    <aside className="sidebar">
      <Logo />

      <nav className="filter-nav">
        <p>YOUR SPACE</p>

        {categories.map((item) => {
          const count =
            item === "all"
              ? tasks.length
              : tasks.filter(
                  (task) => task.category === item
                ).length;

          return (
            <button
              key={item}
              className={`nav-link ${
                category === item ? "active" : ""
              }`}
              onClick={() =>
                onCategoryChange(item)
              }
            >
              <i
                className={`category-dot ${item.toLowerCase()}`}
              />

              {item === "all"
                ? "All tasks"
                : item}

              <span>{count}</span>
            </button>
          );
        })}
      </nav>

      <div className="profile">
        <div className="avatar">
          {initials(user.name)}
        </div>

        <div>
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </div>

        <button
          className="icon-button"
          onClick={onLogout}
          title="Sign out"
        >
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
}