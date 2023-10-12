import { Dispatch, SetStateAction } from "react";

function openModal(setIsOpen: Dispatch<SetStateAction<boolean>>) {
    setIsOpen(true);
}

function closeModal(setIsOpen: Dispatch<SetStateAction<boolean>>) {
    setIsOpen(false);
}

export const modalUtils = {
    openModal,
    closeModal
}