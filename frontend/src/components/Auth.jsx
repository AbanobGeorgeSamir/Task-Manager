import { useState } from "react";
import Logo from "./Logo";
import { ArrowIcon } from "./Icons";
import { request } from "../api";

export default function Auth({
  mode,
  onModeChange,
  onAuthenticated,
}) {
  const signup = mode === "signup";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (signup && form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = signup
        ? "/auth/register"
        : "/auth/login";

      const body = signup
        ? form
        : {
            email: form.email,
            password: form.password,
          };

      const response = await request(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      localStorage.setItem(
        "taskflow_token",
        response.token
      );

      onAuthenticated(response.user);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Can’t reach the API. Start the backend and try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <Logo />

        <div className="intro-copy">
          <span className="eyebrow">
            THOUGHTFUL PRODUCTIVITY
          </span>

          <h1>
            Make space for
            <br />
            <em>what matters.</em>
          </h1>

          <p>
            Turn your intentions into a clear, calm plan.
            One task at a time.
          </p>
        </div>

        <div className="intro-proof">
          <div className="proof-avatars">
            <span>J</span>
            <span>M</span>
            <span>A</span>
          </div>

          <p>
            Made for people who want a little more focus.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-heading">
            <span className="overline">
              WELCOME {signup ? "IN" : "BACK"}
            </span>

            <h2>
              {signup
                ? "Start your flow."
                : "Good to see you."}
            </h2>

            <p>
              {signup
                ? "Create your workspace in a few seconds."
                : "Sign in to pick up where you left off."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
          >
            {signup && (
              <label>
                Full name

                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            <label>
              Email address

              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password

              <input
                name="password"
                type="password"
                autoComplete={
                  signup
                    ? "new-password"
                    : "current-password"
                }
                placeholder={
                  signup
                    ? "At least 8 characters"
                    : "Enter your password"
                }
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </label>

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <button
              className="button primary full"
              type="submit"
              disabled={loading}
            >
              {loading
                ? signup
                  ? "Creating workspace…"
                  : "Signing in…"
                : signup
                ? "Create my workspace"
                : "Sign in"}

              {!loading && <ArrowIcon />}
            </button>
          </form>

          <p className="auth-switch">
            {signup
              ? "Already have an account?"
              : "New to Taskflow?"}{" "}

            <button
              className="text-button"
              onClick={() =>
                onModeChange(
                  signup ? "login" : "signup"
                )
              }
            >
              {signup
                ? "Sign in"
                : "Create an account"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}