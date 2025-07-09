import { CirclePlay } from "lucide-react";
import { useContext, useRef } from "react";
import { CommonButton } from "../CommonButton";
import { CommonInput } from "../CommonInput";
import { Cycles } from "../Cycles";
import { FocusTimeLabel } from "../FocusTimeLabel";
import type { TaskModel } from "../../models/TaskModel";
import { TaskContext } from "../../templates/contexts/TaskContext/context";

export default function MainForm() {
  const TaskNameInput = useRef<HTMLInputElement>(null);
  const { setState } = useContext(TaskContext);

  /* function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        formattedSecondsRemaining: "21:00",
      };
    });
  } */

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (TaskNameInput.current === null) return;
    const taskName = TaskNameInput.current.value.trim();
    if (!taskName) {
      alert("Por favor, digite o nome da tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: crypto.randomUUID(),
      title: taskName,
      startAt: new Date().getTime(),
      completedAt: null,
      interruptedAt: null,
      durationInMinutes: 1,
      type: "workTime",
    };

    const secondsRemaining = newTask.durationInMinutes * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: 1, // Conferir
        secondsRemaining, // Conferir
        formattedSecondsRemaining: "00:00",
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  return (
    <form className="form" onSubmit={handleCreateNewTask} action="">
      <div className="formRow">
        <CommonInput
          id="task"
          label="task"
          type="text"
          placeholder="Digite o título da task"
          ref={TaskNameInput}
        />
      </div>
      <FocusTimeLabel time={25} />
      <Cycles />
      <CommonButton icon={<CirclePlay />} type="submit" />
      {/* <CommonButton icon={<StopCircle />} color="red" type="submit" /> */}
    </form>
  );
}
