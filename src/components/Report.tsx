import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { generateReport } from "../utils/generateReport";
import { getGeneralData } from "../utils/getDataToGeneralReport";
import { IGeneralData } from "../contracts/generatalData";
import { modalUtils } from "../utils/modalUtils";
import { ModalComponent } from "./Modal";

function Report() {
  const loading = 'carregando dados ...';
  const [data, setData] = useState<string | IGeneralData>(loading);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleChange = (event: any) => {
    setPhoneNumber(event.target.value);
  };
    
  const handleSubmit = (event: any) => {
    event.preventDefault();
    generateReport(data, phoneNumber);
    modalUtils.closeModal(setIsOpen);
  };
  
  const getData = async () => {
    const response = await getGeneralData();
    setData(response);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Button onClick={() => modalUtils.openModal(setIsOpen)}>Relatório Geral</Button>
      <div>
        <ModalComponent 
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        phoneNumber={phoneNumber}
        handleChange={handleChange}/>
      </div>
    </>
  );
}

export default Report;

const Button = styled.button`
  text-align: center;
  margin-bottom: 30px;
  width: 160px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 2px 2px 2px grey;
  border: none;
  cursor: pointer;
  background-color: grey;
  font-family: 'Arial';
  color: white;

  &&:hover {
    filter: brightness(0.8);
  }
`;
const InputText = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 6px;
  border: 1px solid grey;
  padding-left: 5px;
  box-sizing: border-box;
`