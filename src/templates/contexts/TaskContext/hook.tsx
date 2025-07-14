import { useContext, useEffect, useState, useCallback } from "react";
import { TaskContext } from "./context";
import { formartSecondsToMinutes } from "../../../utils/formartSecondsToMinutes";
import type { TaskModel } from "../../../models/TaskModel";
import alarmSound from "../../../assets/sounds/funny-alarm.mp3";

const audio = new Audio(alarmSound);

// Hook para acessar o contexto de tasks
export function useTaskContext() {
  return useContext(TaskContext);
}

// Hook para saber se existe uma task ativa e não interrompida/completada
export function useIsCurrentTaskActive() {
  const { state } = useTaskContext();
  return (
    state.activeTask != null &&
    state.activeTask.interruptedAt == null &&
    state.activeTask.completedAt == null
  );
}

// Hook para obter a task ativa
export function useActiveTask() {
  const { state } = useTaskContext();
  return state.activeTask;
}

// Função para obter o próximo ciclo
export const getNextCycleIndex = (
  currentCycleIndex: number,
  totalCycles: number
) => {
  if (currentCycleIndex === totalCycles) return 1;

  return currentCycleIndex + 1;
};

// Função para obter o tipo de ciclo
export function getNextCycleType(currentCycle: number): TaskModel["type"] {
  if (currentCycle === 8) return "longBreakTime";
  if (currentCycle % 2 === 0) return "shortBreakTime";
  return "workTime";
}

// Função para obter o tempo em segundos para a próxima task
export function useNextTaskSeconds() {
  const { state } = useTaskContext();

  const totalCycles = 8;
  const nextCycle = getNextCycleIndex(state.currentCycle, totalCycles);
  const nextCycleType = getNextCycleType(nextCycle);
  const seconds = Math.floor(Number(state.config[nextCycleType]) * 60);

  return seconds;
}

// Hook para centralizar ações de manipulação de tasks
export function useTaskActions() {
  const { state, setState } = useTaskContext();

  const totalCycles = 8;
  const nextCycle = getNextCycleIndex(state.currentCycle, totalCycles);
  const nextCycleType = getNextCycleType(nextCycle);
  const nextCycleTime = state.config[nextCycleType];
  //const { setCountdown } = useStartCountdown();

  // Cria uma nova task e avança o ciclo
  const createTask = (taskName: string) => {
    // Zera o array tasks se o total de ciclos for atingido
    if (state.tasks.length >= totalCycles) {
      setState((prevState) => ({ ...prevState, tasks: [] }));
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
    const secondsRemaining = Math.floor(Number(newTask.durationInMinutes) * 60);

    setState((prevState) => ({
      ...prevState,
      config: { ...prevState.config },
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining,
      formattedSecondsRemaining: formartSecondsToMinutes(secondsRemaining),
      tasks: [...prevState.tasks, newTask],
    }));
    //setCountdown(secondsRemaining);
  };

  // Interrompe a task ativa
  const interruptTask = () => {
    setState((prevState) => ({
      ...prevState,
      activeTask: prevState.activeTask
        ? { ...prevState.activeTask, interruptedAt: new Date().getTime() }
        : null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    }));
  };

  return { createTask, interruptTask, nextCycleType, nextCycleTime };
}

// Pega o valor atualizado da variavel formattedSecondsRemaining da task ativa sempre que o state for atualizado
export function useGetUpdatedFormattedSecondsRemaining() {
  const { state } = useTaskContext();
  return state.formattedSecondsRemaining;
}

// Hook para interromper a task ativa
export function useInterruptCountdown() {
  const { setState } = useTaskContext();
  return useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      activeTask: prevState.activeTask
        ? { ...prevState.activeTask, interruptedAt: new Date().getTime() }
        : null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    }));
  }, [setState]);
}

// Hook para finalizar a task ativa
export function useStopCountdown() {
  const { setState } = useTaskContext();
  return useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      activeTask: prevState.activeTask
        ? { ...prevState.activeTask, completedAt: new Date().getTime() }
        : null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    }));
  }, [setState]);
}

// Hook para controlar o countdown da task ativa
export function useStartCountdown() {
  const { state, setState } = useTaskContext();
  const [countdown, setCountdown] = useState(state.secondsRemaining);
  const isCurrentTaskActive = useIsCurrentTaskActive();
  const stopCountdown = useStopCountdown();

  // Sincroniza countdown local com o global ao criar nova task
  useEffect(() => {
    setCountdown(state.secondsRemaining);
  }, [state.secondsRemaining]);

  // Atualiza o state global de segundos e string formatada
  const updateStateSeconds = useCallback(
    (newSeconds: number) => {
      setState((prevState) => ({
        ...prevState,
        secondsRemaining: newSeconds,
        formattedSecondsRemaining: formartSecondsToMinutes(newSeconds),
      }));
    },
    [setState]
  );

  // Efeito principal do countdown
  useEffect(() => {
    if (!state.activeTask || !isCurrentTaskActive) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        const newCountdown = countdown - 1;
        setCountdown(newCountdown);
        updateStateSeconds(newCountdown);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      audio.play().catch((error) => {
        console.error("Erro ao tocar o som:", error);
      });
      stopCountdown();
    }
  }, [
    countdown,
    state.activeTask,
    isCurrentTaskActive,
    updateStateSeconds,
    stopCountdown,
  ]);

  return { countdown, setCountdown };
}
