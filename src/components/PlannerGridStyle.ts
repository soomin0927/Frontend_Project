import styled from "styled-components";

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  gap: 20px;
`;

export const AddBtn = styled.button`
  width: 150px;
  height: 50px;
  background-color: #4a4a4a;
  border: none;
  border-radius: 5px;
  font-size: 18px;
`;

export const SaveBtn = styled.button`
  width: 150px;
  height: 50px;
  background-color: #4a4a4a;
  border: none;
  border-radius: 5px;
  font-size: 18px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid #aaa;
  background-color: #fff;
  padding: 50px;
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  border-top: 1px solid #aaa;
`;

export const TimeHeader = styled.div`
  height: 50px;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
`;

export const DayHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid #aaa;
  border-right: 1px solid #aaa;
  display: flex;
  font-size: 20px;
  color: #555;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
`;

export const TimeColumn = styled.div`
  width: 80px;
`;

export const TimeCell = styled.div`
  height: 90px;
  box-sizing: border-box;
  border-left: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  border-right: 1px solid #aaa;
  padding-top: 8px;
  color: #555;
  font-size: 16px;
  text-align: center;
`;

export const GridColumns = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  position: relative;
`;

export const GridCell = styled.div`
  height: 90px;
  box-sizing: border-box;
  border-bottom: 1px solid #aaa;
`;

export const DayColumn = styled.div`
  position: relative;
  border-right: 1px solid #aaa;
`;

export const EmptyOverlay = styled.div`
    position: absolute;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: #555555b9;

    z-index: 10;
`;

export const EmptyTitle = styled.h3`
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 12px;
    color: #fff;
`;

export const EmptyText = styled.p`
    font-size: 22px;
    color: #fff;
`;