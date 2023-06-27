import { useEffect, useState } from "react";
import { requests } from "../../api";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { styled } from "styled-components";
ChartJS.register(ArcElement, Tooltip, Legend);

function Pizza() {
    const loading = 'carregando dados ...';
    const [data, setData] = useState<any>(loading);
  
    async function getData() {
      const result = await requests.getData();
      const table = result.table.rows[0];;
      const MDO = table.c[13].v;
      let associations: any = {}
      result?.table?.rows?.map((value: any, index: number) => {
        
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
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(13, 32, 46, 0.527)',
              'rgba(224, 102, 218, 0.418)',
              'rgba(236, 16, 225, 0.61)',
              'rgba(16, 203, 236, 0.507)',
              'rgba(188, 236, 16, 0.507)',
              'rgba(236, 78, 16, 0.507)',
              'rgba(235, 219, 130, 0.507)',
              'rgba(110, 143, 91, 0.384)',
            ],
            borderColor: [
              'rgb(255, 99, 133)',
              'rgb(54, 163, 235)',
              'rgba(7, 21, 31, 0.678)',
              'rgb(224, 102, 218)',
              'rgb(236, 16, 225)',
              'rgb(16, 203, 236)',
              'rgb(188, 236, 16)',
              'rgb(236, 78, 16)',
              'rgba(235, 219, 130, 0.959)',
              'rgba(110, 143, 91, 0.952)',
            ],
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

const Content = styled.div`
    width: 100%;
    margin: 30px;
    border-radius: 5px;
    background-color: #69696915;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`
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