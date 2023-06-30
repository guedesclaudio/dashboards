import { useEffect, useState } from "react";
import { requests } from "../api";
import { styled } from "styled-components";
import Box from '@mui/material/Box';
import Progress from "./progress";

function TotalProgress() {
    const loading = 'carregando dados ...';
    const [total, setTotal] = useState<any>(loading);
    const [totalTax, setTotalTax] = useState<number>(0);
  
    async function getData() {
      const result = await requests.getData();
      const totalBuilding = (result.table.rows[0].c[6]);
      const estimatedTotal = result.table.rows[0].c[18];
      const tax = Number(((totalBuilding.v / estimatedTotal.v) * 100).toFixed(2));
      setTotalTax(tax)
      setTotal(totalBuilding);
      return result;
    }

    useEffect(() => {
        getData();
    }, []);
    
    
  return (
    <Content>
        <TotalText>
            {total?.f ? `Total gasto até o momento ${total?.f}`: loading}
        </TotalText>
      <Box sx={{ width: '100%' }}>
        <Progress value = {totalTax}/>
      </Box>
    </Content>
  );
}

export default TotalProgress;

const Content = styled.div`
    width: 100%;
    margin: 30px;
    border-radius: 5px;
    background-color: #69696915;
    padding: 15px;
    box-sizing: border-box;
`
const TotalText = styled.h1`
    font-family: 'Arial';
    font-size: 22px;
    padding-bottom: 20px;
    color: grey;

    @media (max-width: 600px) {
      font-size: 18px;
  }
`