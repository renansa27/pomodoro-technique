import { useContext } from "react";
import { TaskContext } from "../../templates/contexts/TaskContext/context";
import styles from "./styles.module.css";

export function Countdown() {
  const { state } = useContext(TaskContext);

  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
