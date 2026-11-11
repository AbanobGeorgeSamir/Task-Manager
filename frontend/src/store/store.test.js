import test from "node:test";
import assert from "node:assert/strict";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { userSet, userCleared } from "./authSlice.js";
import tasksReducer, {
  tasksLoaded,
  taskAdded,
  taskUpdated,
  taskRemoved,
  tasksCleared,
} from "./tasksSlice.js";

const makeStore = () =>
  configureStore({ reducer: { auth: authReducer, tasks: tasksReducer } });

const task = (id, extra = {}) => ({ _id: id, title: `Task ${id}`, completed: false, ...extra });

test("auth slice stores and clears the signed-in user", () => {
  const store = makeStore();
  store.dispatch(userSet({ id: "1", name: "Abanoub" }));
  assert.equal(store.getState().auth.user.name, "Abanoub");

  store.dispatch(userCleared());
  assert.equal(store.getState().auth.user, null);
});

test("tasks slice loads tasks and adds new ones to the top", () => {
  const store = makeStore();
  store.dispatch(tasksLoaded([task("1"), task("2")]));
  store.dispatch(taskAdded(task("3")));

  assert.deepEqual(
    store.getState().tasks.items.map((item) => item._id),
    ["3", "1", "2"]
  );
});

test("tasks slice updates only the matching task", () => {
  const store = makeStore();
  store.dispatch(tasksLoaded([task("1"), task("2")]));
  store.dispatch(taskUpdated(task("2", { completed: true })));

  const [first, second] = store.getState().tasks.items;
  assert.equal(first.completed, false);
  assert.equal(second.completed, true);
});

test("tasks slice removes a task and can be cleared on logout", () => {
  const store = makeStore();
  store.dispatch(tasksLoaded([task("1"), task("2")]));
  store.dispatch(taskRemoved("1"));
  assert.deepEqual(store.getState().tasks.items.map((item) => item._id), ["2"]);

  store.dispatch(tasksCleared());
  assert.equal(store.getState().tasks.items.length, 0);
});
