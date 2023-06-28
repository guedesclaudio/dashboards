import { useEffect, useState } from "react";
import { requests } from "../api";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { styled } from "styled-components";
import { Content } from "../commom/styles/content";
import { pizzaBackgroundColor, pizzaBorderColor } from "../styles/pizza-colors";
ChartJS.register(ArcElement, Tooltip, Legend);

function Pizza() {
    const loading = 'carregando dados ...';
    const [data, setData] = useState<any>(loading);
  
    async function getData() {
      const result = await requests.getData();
      const table = result.table.rows[0];
      const MDO = table.c[13].v;
      let associations: any = {}
      result?.table?.rows?.map((value: any) => {
        
        if (!value?.c[15]?.v) return;
        return associations[value?.c[15]?.v] = value?.c[16]?.v
      });
      
      const finalData = {
        MDO,
        ...associations,
      }

      setData(finalData);
      return result;
    }

    useEffect(() => {
        getData();
    }, []);
    const dataChart = {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Divisão de gastos',
            data: Object.values(data),
            backgroundColor: pizzaBackgroundColor,
            borderColor: pizzaBorderColor,
            borderWidth: 1,
          },
        ],
      };
    
  return (
    <Content>
        <TotalText>Distribuição das despesas</TotalText>
        <BoxPizza>
          <Pie 
              data={dataChart}
              width={20}
          />
        </BoxPizza>
    </Content>
  );
}

export default Pizza;

const TotalText = styled.h1`
    font-family: 'Arial';
    font-size: 22px;
    padding-bottom: 20px;
    color: grey;
`
const BoxPizza = styled.div`
  width: 500px;

  @media (max-width: 600px) {
    width: 100%;
  }
`