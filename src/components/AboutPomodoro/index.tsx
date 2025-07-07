import MainTemplate from "../../templates/MainTemplate";
import Container from "../Container";
import { GenericHtml } from "../GenericHtml";
import { Heading } from "../Heading";

export function AboutPomodoro() {
  return (
    <MainTemplate>
      <Container isFluid>
        <GenericHtml>
          <Heading>O que é o Pomodoro?</Heading>
          <p>
            O Pomodoro é uma técnica de gerenciamento de tempo que ajuda a
            aumentar a produtividade e a melhorar a qualidade do trabalho.
          </p>
          <h2>Como funciona o Pomodoro?</h2>
          <p>
            O Pomodoro é uma técnica de gerenciamento de tempo que ajuda a
            aumentar a produtividade e a melhorar a qualidade do trabalho.
          </p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}
