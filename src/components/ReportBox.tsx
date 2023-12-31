import { styled } from "styled-components";
import { Content } from "../commom/styles/content";
import { useState } from "react";
import { generateMDOReport } from "../utils/generateMDOReport";
import { modalUtils } from "../utils/modalUtils";
import { generateReport } from "../utils/generateReport";
import { ModalComponent } from "./Modal";

function ReportBox({legend, renderData, sendData}: any) {
  const keys = Object.keys(renderData || {}) || [];
  const values: any = Object.values(renderData || {}) || [];
  const [displayButton, setDisplayButton] = useState<string>('initial');
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (legend.includes('Mão de obra')) {
      generateMDOReport(sendData, phoneNumber, legend);
    } else {
      generateReport(sendData, phoneNumber);
    }
    
    modalUtils.closeModal(setIsOpen);
  };

  const handleChange = (event: any) => {
    setPhoneNumber(event.target.value);
  };

  const printPage = () => {
    setDisplayButton('none');
    setTimeout(() => window.print(), 100);
    setTimeout(() => setDisplayButton('initial'), 1000);
  }

  return (
    <ReportPage>
      <Content>
        <Legend>{legend}</Legend>
        {keys?.map((key: any, index: number) => <Item key={index}>
          <Key>{key}</Key>
          <Value style={{color: values[index].split(" ").some((value: any) => value === "R$") ? "#5cf15c": "grey"}}>{values[index]}</Value>
        </Item>)}
        <Buttons>
          <Button onClick={printPage} style = {{display: displayButton}}>Imprimir</Button>
          <Button onClick = {() => modalUtils.openModal(setIsOpen)} style = {{display: displayButton}}>Enviar</Button>
        </Buttons>
      </Content>
      <ModalComponent 
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        phoneNumber={phoneNumber}
        handleChange={handleChange}/>
    </ReportPage>
  );
}
export default ReportBox;

const Legend = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
  color: grey;
`;
const ReportPage = styled.div`
  margin: 0px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Key = styled.p`
    font-family: Arial, Helvetica, sans-serif;
    color: grey;

    @media (max-width: 600px) {
    font-size: 12px;
  }
`;
const Value = styled(Key)``;
const Item = styled.div`
  margin: 5px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: white;
  border-radius: 6px;
`;
const Button = styled.button`
  margin-top: 20px;
  width: 140px;
  height: 30px;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  color: grey;
  background-color: white;
  border: none;
  border-radius: 6px;
  box-shadow: 1px 1px 1px grey;
  cursor: pointer;

  &&:hover {
    background-color: #c5c0c0;
    color: white;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`