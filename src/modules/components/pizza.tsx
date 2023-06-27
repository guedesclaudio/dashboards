import { useEffect, useState } from "react";
import { requests } from "../../api";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { styled } from "styled-components";
ChartJS.register(ArcElement, Tooltip, Legend);

function Pizza() {
    const loading = 'carregando dados ...';
    const [data, setData] = useState<any>(loading);
    const [total, setTotal] = useState<any>(loading);
  
    async function getData() {
      const result = await requests.getData();
      const totalBuilding = (result.table.rows[0].c[6]);
      const totalMdo = (result.table.rows[0].c[12]);
      let associations: any = {}
      result?.table?.rows?.map((value: any, index: number) => {
        console.log(value?.c[16]?.v)
        if (!value?.c[15]?.v) return;
        return associations[value?.c[15]?.v] = value?.c[16]?.v
      });
      //console.log(associations);
      const totalDocs = (result.table.rows[0].c[16]);
      const totalIron = (result.table.rows[1].c[16]);
      const totalEletric = (result.table.rows[2].c[16]);
      
      const finalData = {
        ...associations,
      }

      setData(finalData);
      setTotal(totalBuilding);
      console.log(totalBuilding)
      console.log(Object.keys(finalData))
      console.log(Object.values(finalData))
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
              'rgba(7, 21, 31, 0.2)',
              'rgba(224, 102, 218, 0.418)',
              'rgba(236, 16, 225, 0.61)',
              'rgba(16, 203, 236, 0.507)',
              'rgba(188, 236, 16, 0.507)',
              'rgba(236, 78, 16, 0.507)',
              'rgba(235, 219, 130, 0.507)',
            ],
            borderColor: [
              'rgb(255, 99, 133)',
              'rgb(54, 163, 235)',
              'rgb(7, 21, 31)',
              'rgb(224, 102, 218)',
              'rgb(236, 16, 225)',
              'rgb(16, 203, 236)',
              'rgb(188, 236, 16)',
              'rgb(236, 78, 16)',
              'rgb(235, 219, 130)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
  return (
    <Content>
        <TotalText>
            {/* <div>
                {total ? `Total gasto até o momento ${total.f}`: loading}
            </div> */}
            <div>
                Distribuição das despesas
            </div>
        </TotalText>
        <div  style={{width: 400}}>
        <Pie 
            data={dataChart}
            width={20}
        />
        </div>
        
    </Content>
  );
}

export default Pizza;

const Content = styled.div`
    width: 400px;
    margin: 60px auto;
    border-radius: 5px;
    background-color: #69696915;
    padding: 15px;
`
const TotalText = styled.h1`
    font-family: 'Arial';
    font-size: 22px;
    padding-bottom: 20px;
    color: grey;
`