import { useEffect, useState } from "react";
import { requests } from "../api";
import { styled } from "styled-components";
import Modal from 'react-modal';
import { generateReport } from "../utils/generateReport";
import { modalStyle } from "../styles/modalStyle";
import { ModalLegend } from "../styles/legend-modal";
import { ModalButtons } from "../styles/modal-button";

function Report() {
    const loading = 'carregando dados ...';
    const [data, setData] = useState<any>(loading);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [texto, setTexto] = useState('');

    const handleChange = (event: any) => {
        setTexto(event.target.value);
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        generateReport(data, texto);
        closeModal();
      };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
  
    async function getData() {
      let associationsDescription = '';
      const associations: any = {}
      const result = await requests.getData();
      const table = result.table.rows[0];
      const totalBuilding = (table.c[6]);
      const estimatedTotal = table.c[18];
      const totalMdo = table.c[13];
      const estimatedMdo = table.c[19];
      const taxMdo = Number(((totalMdo.v / estimatedMdo.v) * 100).toFixed(2));
      const tax = Number(((totalBuilding.v / estimatedTotal.v) * 100).toFixed(2));
      const valueMeters = table.c[9];
      
      result?.table?.rows?.map((value: any) => {
        if (!value?.c[15]?.v) return;
        const key = value?.c[15]?.v;
        const keyFormat = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        return associations[keyFormat] = value?.c[16]?.f;
      });

      for (let i = 0; i < Object.keys(associations).length; i++) {
        associationsDescription += `- ${Object.keys(associations)[i]}: ${Object.values(associations)[i]}\n` ;
      }
      
      const finalData = {
        associationsDescription,
        totalBuilding,
        estimatedTotal,
        totalMdo,
        estimatedMdo,
        taxMdo,
        tax,
        valueMeters
      };
      
      setData(finalData);
      return result;
    }
    useEffect(() => {
        getData();
    }, []);
  return (
    <>
        <Button onClick={openModal}>Relatório</Button>
        <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <ModalLegend>Digite o número de telefone</ModalLegend>
        <form onSubmit={handleSubmit}>
          <InputText placeholder="somente dígitos com DDD" value={texto} onChange={handleChange}/>
          <ModalButtons>
            <button onClick={closeModal}>cancelar</button>
            <button type="submit">enviar</button>
          </ModalButtons>
        </form>
      </Modal>
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