import { useContext } from "react";
import { TaskContext } from "./context";

export function useTaskContext() {
  return useContext(TaskContext);
}
