import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  HouseIcon,
  HistoryIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

type AvailableThemes = "dark" | "light";

export function Menu() {
  const localStorageTheme = localStorage.getItem("theme") as AvailableThemes;

  const [theme, setTheme] = useState<AvailableThemes>(
    localStorageTheme || "dark"
  );

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault(); // Previne o redirecionamento para a URL do link
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  // Como utilizar o useEffect?
  /* useEffect(() => {
    console.log("useEffect sem array de dependências");
  }); // Executa sempre que o componente for atualizado */

  /* useEffect(() => {
    console.log("useEffect com array vazio");
  }, []); // Executa apenas uma vez, quando o componente for montado */

  useEffect(() => {
    console.log("useEffect com array de dependências, valor de theme:", theme);
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    // Função de cleanup: executa antes da próxima execução do useEffect ou quando o componente for desmontado
    // Útil para limpar timers, event listeners, requisições ou reverter mudanças
    return () => {
      console.log("Olha, este componente será atualizado");
    };
  }, [theme]); // Executa sempre que o valor de theme for alterado

  return (
    <nav className={styles.menu}>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Página inicial"
        title="Página inicial"
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Histórico"
        title="Histórico"
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href="https://google.com.br"
        aria-label="Tema"
        title="Tema"
        onClick={handleThemeChange}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </a>
    </nav>
  );
}
