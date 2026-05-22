import styled from "styled-components";

interface BlockProps {
    $top: number;
    $height: number;
    $color: string;
}

export const Block = styled.div<BlockProps>`
    width: 100%;
    top: ${({ $top }) => `${$top}px`};
    height: ${({ $height }) => `${$height}px`};
    position: absolute;
    background-color: ${({ $color }) => $color};
    color: white;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Info = styled.div`
`;

export const Title = styled.div`
    // padding-top: 10px;
    font-size: 16px;
    font-weight: bold;
`;

export const Time = styled.div`
    padding-top: 5px;
    font-size: 14px;
`;