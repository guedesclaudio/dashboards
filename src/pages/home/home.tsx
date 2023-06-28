import { styled } from "styled-components";
import Pizza from "../../components/pizza";
import TotalProgress from "../../components/progressTotal";
import Report from "../../components/report";
import Modal from 'react-modal';
import { modalStyle } from "../../styles/modalStyle";
import { useEffect, useState } from "react";
import { ModalLegend } from "../../styles/legend-modal";
import { ModalButtons } from "../../styles/modal-button";
import { alertFriday } from "../../utils/alertFriday";

function Home() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const isFriday = alertFriday();
    if(isFriday) setIsOpen(true);
  }, []);
  
  return (
    <>
      <HomePage>
        <BoxText>
          Acompanhe os seus gastos e gere relatórios
        </BoxText>
        <Pizza/>
        <TotalProgress/>
        <Report/>
        <Modal
        isOpen={modalIsOpen}
        
        style={modalStyle}
      >
        <ModalLegend>Dia de pagar mão de obra</ModalLegend>
        <ModalButtons>
          <button onClick={() => setIsOpen(false)}>fechar</button>
        </ModalButtons>
      </Modal>
      </HomePage>
    </>
  );
}
export default Home;

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
const BoxText = styled.h1`
  text-align: center;
  margin-top: 20px;
  font-size: 26px;
  font-family: 'Arial';
  font-style: bold;
  color: grey;
`;