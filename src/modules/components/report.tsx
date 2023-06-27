import { useEffect, useState } from "react";
import { requests } from "../../api";
import { styled } from "styled-components";
import Modal from 'react-modal';

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
        generateReport(data);
        closeModal();
      };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
        },
      };
  
    async function getData() {
      const result = await requests.getData();
      const totalBuilding = (result.table.rows[0].c[6]);
      const estimatedTotal = result.table.rows[0].c[18];
      const tax = Number(((totalBuilding.v / estimatedTotal.v) * 100).toFixed(2));
      const totalMdo = result.table.rows[0].c[13];
      const estimatedMdo = result.table.rows[0].c[19];
      const taxMdo = Number(((totalMdo.v / estimatedMdo.v) * 100).toFixed(2));
      const valueMeters = result.table.rows[0].c[9];
      let associationsDescription = '';
      const associations: any = {}
      result?.table?.rows?.map((value: any) => {
        if (!value?.c[15]?.v) return;
        return associations[value?.c[15]?.v] = value?.c[16]?.f
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
      }
      
      setData(finalData);
      return result;
    }

    function generateReport(data: any): Window | null {
        const report = `
        Total gasto até o momento: ${data?.totalBuilding?.f}\nOrçamento estimado: ${data?.estimatedTotal?.f}\nOrçamento comprometido: ${data?.tax} %\n-----------------------------------------------\nTotal gasto com mão de obra: ${data?.totalMdo?.f}\nOrçamento estimado: ${data?.estimatedMdo?.f}\nOrçamento comprometido: ${data?.taxMdo} %\n-----------------------------------------------\nValor do metro quadrado: ${data?.valueMeters?.f}\n-----------------------------------------------\nDistribuição das despesas:\n${data?.associationsDescription}
        `
        const formatReport = encodeURIComponent(report);
        const url = 'https://api.whatsapp.com/send?phone=' + `+55${texto}` + '&text=' + formatReport;
        return window.open(url);
    }

    useEffect(() => {
        getData();
    }, []);
  return (
    <>
        <Button onClick={openModal}>
            Relatório
        </Button>
        <div>
      <Modal
        isOpen={modalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Legend>Digite o número de telefone</Legend>
        <form onSubmit={handleSubmit}>
          <InputText placeholder="somente dígitos com DDD" value={texto} onChange={handleChange}/>
          <Buttons>
            <button onClick={closeModal}>cancelar</button>
            <button type="submit">enviar</button>
          </Buttons>
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
    width: 120px;
    height: 30px;
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
const Legend = styled.p`
    text-align: center;
    margin-bottom: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: grey;
`
const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;

    && button {
        width: 100px;
        height: 30px;
        border: none;
        background-color: #c2bfbf;
        color: white;
        font-family: 'Arial';
        font-size: 15px;
        border-radius: 6px;
        cursor: pointer;
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