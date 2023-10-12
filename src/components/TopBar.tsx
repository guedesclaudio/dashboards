import { styled } from "styled-components";
import OptionsMenu from "./OptionsMenu"

function TopBar() {
  return (
    <>
      <Content>
        <Link href="/">
          <Title>Dashboards</Title>
        </Link>
        <OptionsMenu/>
      </Content> 
    </>
  );
}
export default TopBar;

const Content = styled.div`
  width: 100%;
  height: 60px;
  background-color: #534f4f;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  color: white;
  font-family: 'Arial';
  text-align: center;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`
const Link = styled.a`
  text-decoration: none;
  margin-left: 10px;
`;