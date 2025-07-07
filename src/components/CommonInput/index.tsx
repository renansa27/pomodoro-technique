import styles from "./styles.module.css";

type CommonInputProps = {
  id: string;
  label: string;
} & React.ComponentProps<"input">;

export function CommonInput({ id, label, type, ...rest }: CommonInputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}
