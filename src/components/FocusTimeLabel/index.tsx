import styles from "./styles.module.css";

type FocusTimeLabelProps = {
  time: number;
};

export function FocusTimeLabel({ time }: FocusTimeLabelProps) {
  return (
    <div>
      <span>Nesse ciclo </span>
      <span className={styles.boldSpan}>foque </span>
      <span>por </span>
      <span className={styles.boldSpan}>{time} min.</span>
    </div>
  );
}
