const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);

  const payload =
    response.status === 204
      ? null
      : await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      payload?.message || "Request failed."
    );

    error.status = response.status;

    throw error;
  }

  return payload;
}

export function authHeaders() {
  const token = localStorage.getItem("taskflow_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export default API_URL;