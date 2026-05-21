import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border: 1px solid #aaa;
  background-color: #fff;
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
`;

export const TimeHeader = styled.div`
  height: 50px;
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
`;

export const DayHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid #aaa;
  border-right: 1px solid #aaa;
  display: flex;
  justify-content: center;
  font-weight: bold;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
`;

export const TimeColumn = styled.div`
  width: 80px;
`;

export const TimeCell = styled.div`
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #aaa;
  border-right: 1px solid #aaa;
  padding-top: 8px;
  font-size: 12px;
  text-align: center;
`;

export const GridColumns = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const GridCell = styled.div`
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #aaa;
`;

export const DayColumn = styled.div`
  position: relative;
  border-right: 1px solid #aaa;
`;