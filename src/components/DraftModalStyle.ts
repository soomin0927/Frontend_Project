import styled from "styled-components";

export const ModalOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #4e4e4e80;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    width: 400px;
    padding: 10px 30px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.div`
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #232323;
`; 

export const Field = styled.div`
    justify-content: center;
    display: flex;
    margin-bottom: 10px;
`; 

export const Label = styled.div`
    width: 100px;
    color: #232323;
`; 

export const Select = styled.select`
    width: 200px;
    height: 40px;
    background-color: #989898;
    color: #424242;
    font-size: 16px;
`; 

export const TextArea = styled.textarea`
    width: 195px;
    height: 100px;
    resize: none;
    color: black;
    background-color: #fff;
`;

export const BtnGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 20px 0;
`;

export const CancelBtn = styled.button`
    width: 90px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    background-color: #d63434;
`;

export const ConfirmBtn = styled.button`
    width: 90px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    background-color: #008a10;
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    margin: 30px 0;
    align-items: center;
`;

export const DeleteBtn = styled.button`
    width: 80px;
    height: 35px;
    padding: 5px 10px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #d63434;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #d63434;
    background-color: #fff;
`;