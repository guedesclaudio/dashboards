import { styled } from "styled-components";
import Pizza from "../components/pizza";
import { slide as Menu } from 'react-burger-menu';
import Progress from '../components/progress';
import Box from '@mui/material/Box';
import TotalProgress from "../components/progressTotal";
import Report from "../components/report";


function Home() {
  return (
    <>
      <TopBar>
        <Title>Dashboards</Title>
        <MenuHamburguer>
          {/* <Menu width={200}>
            <Item id="home" className="menu-item" >Home</Item>
            <Item id="about" className="menu-item" >Materiais</Item>
            <Item id="contact" className="menu-item" >Mão de obra</Item>  
          </Menu> */}
        </MenuHamburguer>
      </TopBar> 
      <HomePage>
        <BoxText>
          Acompanhe os seus gastos e gere relatórios
        </BoxText>
        <Pizza/>
        <TotalProgress/>
        <Report/>
      </HomePage>
    </>
  );
}
export default Home;

const TopBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: #534f4f;
`;

const Title = styled.h1`
  font-size: 32px;
  color: white;
  font-family: 'Arial';
  text-align: center;
  padding-top: 10px;
`
const HomePage = styled.div`
  margin: 0px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const MenuHamburguer = styled.div`
  width: 30px;
  background-color: red;
`
const BoxText = styled.h1`
  text-align: center;
  margin-top: 20px;
  font-size: 26px;
  font-family: 'Arial';
  font-style: bold;
  color: grey;
`;