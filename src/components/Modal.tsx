import Modal from 'react-modal'
import { ModalLegend } from "../styles/legend-modal";
import { ModalButtons } from "../styles/modal-button";
import { modalUtils } from '../utils/modalUtils';
import styled from 'styled-components';
import { modalStyle } from "../styles/modalStyle";

export function ModalComponent({modalIsOpen, setIsOpen, handleSubmit, phoneNumber, handleChange}: any) {
    return (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => modalUtils.closeModal(setIsOpen)}
        style={modalStyle}>
            <ModalLegend>Digite o número de telefone</ModalLegend>
            <form onSubmit={handleSubmit}>
            <InputText placeholder="somente dígitos com DDD" value={phoneNumber} onChange={handleChange} type='text' pattern="[0123456789]*" maxLength={11}/>
            <ModalButtons>
                <button onClick={() => modalUtils.closeModal(setIsOpen)}>cancelar</button>
                <button type="submit">enviar</button>
            </ModalButtons>
            </form>
        </Modal>
    )
}

const InputText = styled.input`   
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 6px 6px 0px 0px;
  border-bottom: 2px solid grey;
  padding-left: 5px;
  box-sizing: border-box;
  background-color: #f7f6f6;
  outline: none;

  &&::placeholder {
    color: #b8b0b0;
    font-family: Arial, Helvetica, sans-serif;
  }
`