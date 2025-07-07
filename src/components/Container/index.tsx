// podemos deixar o arquivo raiz da pasta como index.tsx, pois ele será o arquivo default a ser exportado.
// Dessa forma fica mais fácil de importar o componente em outros arquivos e até reaproveitar o conteúdo
// do componente para criação de novos componentes, pois não será necessário mudar o nome dos arquivos,
// apenas o nome da pasta com o componente desejado.

import styles from "./styles.module.css";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  isFluid?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, isFluid }) => {
  return (
    <>
      <div className={isFluid ? styles.containerFluid : styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default Container;
