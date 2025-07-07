import Container from "../../components/Container";
import { Countdown } from "../../components/Countdown";
import MainForm from "../../components/MainForm";
import MainTemplate from "../../templates/MainTemplate";

function Home() {
  return (
    <MainTemplate>
      <Container isFluid>
        <Countdown />
      </Container>
      <Container isFluid>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}

export default Home;
