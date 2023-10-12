import styled from "styled-components";

export const ModalButtons = styled.div`
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
        transition: 20ms
    }

    && button:hover {
        transform: scale(1.05);
        opacity: 0.5;
    }
`;