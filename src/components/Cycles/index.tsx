import styles from "./styles.module.css";
import { useTaskContext } from "../../templates/contexts/TaskContext/hook";

export function Cycles() {
  const { state } = useTaskContext();

  const tipesCyclesList = state.tasks.map((task) => task.type);

  return (
    <>
      {state.tasks.length > 0 && (
        <div className={styles.cycles}>
          <span>Ciclos</span>
          <div className={styles.cycleDots}>
            {tipesCyclesList.map((type, index) => {
              if (type === "workTime") {
                return (
                  <span
                    id={index.toString()}
                    aria-label="Indicador de ciclo de trabalho"
                    title="Ciclo de trabalho"
                    className={`${styles.cycleDot} ${styles.workTime}`}
                  ></span>
                );
              }
              if (type === "shortBreakTime") {
                return (
                  <span
                    aria-label="Indicador de ciclo de descanso curto"
                    title="Ciclo de descanso curto"
                    className={`${styles.cycleDot} ${styles.shortBreakTime}`}
                  ></span>
                );
              }
              if (type === "longBreakTime") {
                return (
                  <span
                    aria-label="Indicador de ciclo de descanso longo"
                    title="Ciclo de descanso longo"
                    className={`${styles.cycleDot} ${styles.longBreakTime}`}
                  ></span>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}
