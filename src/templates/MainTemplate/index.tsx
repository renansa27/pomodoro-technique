import Container from "../../components/Container";
import { Logo } from "../../components/Logo";
import { Menu } from "../../components/Menu";
import { Footer } from "../../components/Footer";

type MainTemplateProps = {
  children: React.ReactNode;
};

function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container isFluid>
        <Logo />
      </Container>
      <Container isFluid>
        <Menu />
      </Container>
      {children}
      <Container isFluid>
        <Footer />
      </Container>
    </>
  );
}

export default MainTemplate;
