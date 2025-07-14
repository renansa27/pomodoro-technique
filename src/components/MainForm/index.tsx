import { CirclePlay, StopCircle } from "lucide-react";
import { useContext, useRef } from "react";
import { CommonButton } from "../CommonButton";
import { CommonInput } from "../CommonInput";
import { Cycles } from "../Cycles";
import { FocusTimeLabel } from "../FocusTimeLabel";
import { TaskContext } from "../../templates/contexts/TaskContext/context";
import {
  useTaskActions,
  useIsCurrentTaskActive,
  useNextTaskSeconds,
  useStartCountdown,
} from "../../templates/contexts/TaskContext/hook";

export default function MainForm() {
  const TaskNameInput = useRef<HTMLInputElement>(null);
  const { state } = useContext(TaskContext);
  const { createTask, interruptTask, nextCycleTime } = useTaskActions();
  const isCurrentTaskActive = useIsCurrentTaskActive();
  const { setCountdown } = useStartCountdown();
  const nextTaskSeconds = useNextTaskSeconds();

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (TaskNameInput.current === null) return;
    const taskName = TaskNameInput.current.value.trim();
    if (!taskName) {
      alert("Por favor, digite o nome da tarefa");
      return;
    }
    createTask(taskName);
    setCountdown(nextTaskSeconds);
  }

  function handleInterruptTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    interruptTask();
  }

  return (
    <form className="form" onSubmit={handleCreateNewTask} action="">
      <div className="formRow">
        <CommonInput
          autoComplete="off"
          id="task"
          label="task"
          type="text"
          placeholder="Digite o título da task"
          ref={TaskNameInput}
        />
      </div>
      <FocusTimeLabel
        isActive={state.activeTask?.interruptedAt == null}
        nextCycleTime={nextCycleTime}
        action={state.activeTask?.type === "workTime" ? "Foque" : "Descanse"}
        time={state.activeTask?.durationInMinutes || 0}
      />
      <Cycles />
      {isCurrentTaskActive ? (
        <CommonButton
          icon={<StopCircle />}
          color="red"
          type="button"
          onClick={handleInterruptTask}
        />
      ) : (
        <CommonButton icon={<CirclePlay />} type="submit" />
      )}
    </form>
  );
}
