import { CirclePlay, StopCircle } from "lucide-react";
import { useContext, useRef, useMemo } from "react";
import { CommonButton } from "../CommonButton";
import { CommonInput } from "../CommonInput";
import { Cycles } from "../Cycles";
import { FocusTimeLabel } from "../FocusTimeLabel";
import type { TaskModel } from "../../models/TaskModel";
import { TaskContext } from "../../templates/contexts/TaskContext/context";
import {
  getNextCycleIndex,
  getNextCycleType,
  useStartCountdown,
  useInterruptCountdown,
  useIsCurrentTaskActive,
} from "../../templates/contexts/TaskContext/hook";
import { formartSecondsToMinutes } from "../../utils/formartSecondsToMinutes";

export default function MainForm() {
  const TaskNameInput = useRef<HTMLInputElement>(null);
  const { state, setState } = useContext(TaskContext);
  const { setCountdown } = useStartCountdown();
  const interruptCountdown = useInterruptCountdown();
  const isCurrentTaskActive = useIsCurrentTaskActive();

  // seta o total de ciclos
  const totalCycles = 8;
  // Memoiza o cálculo do próximo ciclo para evitar recálculos desnecessários
  const { nextCycle, nextCycleType } = useMemo(() => {
    const nextCycle = getNextCycleIndex(state.currentCycle, totalCycles);
    const nextCycleType = getNextCycleType(nextCycle);
    return { nextCycle, nextCycleType };
  }, [state.currentCycle, totalCycles]);

  // cria uma nova task
  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (TaskNameInput.current === null) return;
    const taskName = TaskNameInput.current.value.trim();
    if (!taskName) {
      alert("Por favor, digite o nome da tarefa");
      return;
    }

    // Zera o array tasks se o total de ciclos for atingido
    if (state.tasks.length >= totalCycles) {
      setState((prevState) => {
        return {
          ...prevState,
          tasks: [],
        };
      });
    }

    const newTask: TaskModel = {
      id: crypto.randomUUID(),
      title: taskName,
      startAt: new Date().getTime(),
      completedAt: null,
      interruptedAt: null,
      durationInMinutes: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.durationInMinutes * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle, // Conferir
        secondsRemaining, // Conferir
        formattedSecondsRemaining: formartSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
    setCountdown(secondsRemaining);
  }

  function handleInterruptTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    interruptCountdown();
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
      <FocusTimeLabel
        isActive={state.activeTask?.interruptedAt == null}
        nextCycleTime={state.config[nextCycleType]}
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
