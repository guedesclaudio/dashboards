import { styled } from "styled-components";
import DesktopMenu from "./desktop-menu";


function TopBar() {
  return (
    <>
      <Content>
        <DesktopMenu value = {'Dashboards'}/>
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
`;