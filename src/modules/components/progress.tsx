import { useEffect, useState } from "react";
import { requests } from "../../api";
import { styled } from "styled-components";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Progress(props: LinearProgressProps & { value: number }) {
    
  return (
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
  );
}

export default Progress;

const Content = styled.div`
    width: 300px;
    margin: 60px auto;
    border-radius: 5px;
    background-color: #69696915;
    padding: 15px;
`;
