import { useEffect, useState } from "react";
import { requests } from "../../api";
import { styled } from "styled-components";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Progress(props: LinearProgressProps & { value: number }) {
    const loading = 'carregando dados ...';
    const [total, setTotal] = useState<any>(loading);
  
    async function getData() {
      const result = await requests.getData();
      const totalBuilding = (result.table.rows[0].c[6]);
      setTotal(totalBuilding);
      return result;
    }

    useEffect(() => {
        getData();
    }, []);
    
    
  return (
    <Content>
        <TotalText>
            <div>
                {total?.f ? `Total gasto até o momento ${total?.f}`: loading}
            </div>
        </TotalText>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
            )}%`}</Typography>
      </Box>
    </Box>
    </Content>
  );
}

export default Progress;

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