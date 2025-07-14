import { createContext } from "react";
import type { TaskStateModel } from "../../../models/TaskStateModel";

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0, // 1,2,3... 8 => 1
  config: {
    workTime: 25, // 25 minutos
    shortBreakTime: 5, // 5 minutos
    longBreakTime: 15, // 15 minutos
  },
};

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue = {
  state: initialState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
export { initialState };
