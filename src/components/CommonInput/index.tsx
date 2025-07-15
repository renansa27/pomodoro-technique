import styles from "./styles.module.css";

type CommonInputProps = {
  id: string;
  label: string;
  isCurrentTaskActive: boolean;
} & React.ComponentProps<"input">;

export function CommonInput({
  id,
  label,
  type,
  isCurrentTaskActive,
  ...rest
}: CommonInputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        disabled={isCurrentTaskActive}
        className={styles.input}
        id={id}
        type={type}
        {...rest}
      />
    </>
  );
}
