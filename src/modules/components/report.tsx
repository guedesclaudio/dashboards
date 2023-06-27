import { useEffect, useState } from "react";
import { requests } from "../../api";
import { styled } from "styled-components";

function Report() {
    const loading = 'carregando dados ...';
    const [data, setData] = useState<any>(loading);
  
    async function getData() {
      const result = await requests.getData();
      const totalBuilding = (result.table.rows[0].c[6]);
      const estimatedTotal = result.table.rows[0].c[18];
      const tax = Number(((totalBuilding.v / estimatedTotal.v) * 100).toFixed(2));
      const totalMdo = result.table.rows[0].c[13];
      const estimatedMdo = result.table.rows[0].c[19];
      const taxMdo = Number(((totalMdo.v / estimatedMdo.v) * 100).toFixed(2));
      const valueMeters = result.table.rows[0].c[9];
      console.log(result)

      const associations: any = {}
      result?.table?.rows?.map((value: any) => {
        
        if (!value?.c[15]?.v) return;
        return associations[value?.c[15]?.v] = value?.c[16]?.v
      });
      
      const finalData = {
        ...associations,
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

    function generateReport(data: any) {
        const report = `
            Total gasto até o momento: ${data?.totalBuilding?.f}
            Orçamento estimado: ${data?.estimatedTotal?.f}
            Orçamento comprometido: ${data?.tax} %

            -----------------------------------------------

            Total gasto com mão de obra: ${data?.totalMdo?.f}
            Orçamento estimado: ${data?.estimatedMdo?.f}
            Orçamento comprometido: ${data?.taxMdo} %

            -----------------------------------------------

            Valor do metro quadrado: ${data?.valueMeters?.f}

            -----------------------------------------------

            Distribuição das despesas:
            - Ferro: 
            - Madeira:
            - Elétrica:
            - Documentação:
            ...
        `
    }

    useEffect(() => {
        getData();
    }, []);
  return (
    <Button onClick={() => generateReport(data)}>
        Relatório
    </Button>
  );
}

export default Report;

const Button = styled.button`
    text-align: center;
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
