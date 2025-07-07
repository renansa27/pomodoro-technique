import MainTemplate from "../../templates/MainTemplate";
import Container from "../Container";
import { GenericHtml } from "../GenericHtml";
import { Heading } from "../Heading";

export function NotFound() {
  return (
    <MainTemplate>
      <Container isFluid>
        <GenericHtml>
          <Heading>Página não encontrada</Heading>
          <p>A página que você está procurando não existe.</p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}
