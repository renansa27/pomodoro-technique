import styles from "./styles.module.css";

type CommonClickableTextProps = {
  text: string;
  link: string;
};

export function CommonClickableText({ text, link }: CommonClickableTextProps) {
  return (
    <a className={styles.clickableText} href={link}>
      {text}
    </a>
  );
}
