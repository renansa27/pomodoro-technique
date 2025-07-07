import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  title: string;
  durationInMinutes: string;
  startAt: number;
  completedAt: number | null; // quando o times chegar ao final, o valor será o timestamp da data de término. Caso o usuário interompa o tempo, o valor será null.
  interruptedAt: number | null; // quando o usuário interrompe o tempo, o valor será o timestamp da data de interrupção. Caso o usuário não interrompa o tempo, o valor será null.
  type: keyof TaskStateModel["config"]; // Pega automaticamente os tipos de tarefas da classe TaskStateModel -> "workTime" | "shortBreakTime" | "longBreakTime"
};
