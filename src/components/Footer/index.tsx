import { CommonClickableText } from "../CommonClickableText";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <CommonClickableText text="Entenda a técnica pomodoro 🍅" link="/" />
      <CommonClickableText
        text="Chronos Pomodoro © 2025  - Feito com 💚"
        link="/"
      />
    </footer>
  );
}
