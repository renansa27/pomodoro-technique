/* import { useContext } from "react";
import { TaskContext } from "../../templates/contexts/TaskContext/context"; */
import styles from "./styles.module.css";
import { useGetUpdatedFormattedSecondsRemaining } from "../../templates/contexts/TaskContext/hook";

export function Countdown() {
  const formattedSecondsRemaining = useGetUpdatedFormattedSecondsRemaining();

  return <div className={styles.container}>{formattedSecondsRemaining}</div>;
}
