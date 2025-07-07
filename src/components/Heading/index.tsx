import styles from "./styles.module.css";

// React.ReactNode é uma propriedade que recebe um componente filho e retorna um componente filho
// que seja aceito pelo React.
type HeadingProps = { children: React.ReactNode };

/**
 * Componente Heading que renderiza um título h1
 *
 * Usa desestruturação de props: { children } extrai diretamente a propriedade 'children'
 * do objeto props, permitindo acesso direto sem precisar escrever 'props.children'
 */
export function Heading({ children }: HeadingProps) {
  return <h1 className={styles.heading}>{children}</h1>;
}
