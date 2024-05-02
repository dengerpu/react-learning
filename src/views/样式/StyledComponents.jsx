import { Container, MenuBox } from './style'
const StyledComponents = () => {
  return (
    <Container>
      <h1>Styled Components</h1>
      <p>This is a styled component.</p>
      <MenuBox color='yellow'>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </MenuBox>
    </Container>
  );
}

export default StyledComponents;