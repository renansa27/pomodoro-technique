import styles from "./styles.module.css";

type CommonButtonProps = {
  icon: React.ReactNode;
  color?: "green" | "red";
} & React.ComponentProps<"button">;

export function CommonButton({
  icon,
  color = "green",
  ...rest
}: CommonButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}`} {...rest}>
      {icon}
    </button>
  );
}
