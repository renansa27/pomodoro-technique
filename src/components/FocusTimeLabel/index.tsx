import styles from "./styles.module.css";

type FocusTimeLabelProps = {
  action: "Foque" | "Descanse";
  time: number;
  isActive: boolean;
  nextCycleTime: number;
};

export function FocusTimeLabel({
  action,
  time,
  isActive,
  nextCycleTime,
}: FocusTimeLabelProps) {
  return isActive ? (
    <div>
      <span className={styles.boldSpan}>{action} </span>
      <span>por </span>
      <span className={styles.boldSpan}>{time} min.</span>
    </div>
  ) : (
    <div>
      <span>Próximo ciclo é de </span>
      <span className={styles.boldSpan}>{nextCycleTime} min.</span>
    </div>
  );
}
