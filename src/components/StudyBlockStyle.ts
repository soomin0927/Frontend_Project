import styled from "styled-components";

interface BlockProps {
    $top: number;
    $height: number;
    $color: string;
}

export const Block = styled.div<BlockProps>`
    top: ${({ $top }) => `${$top}px`};
    height: ${({ $height }) => `${$height}px`};
    padding: 10px;
    position: absolute;
    background-color: height: ${({ $color }) => $color};
    color: white;
    cursor: pointer;
`;

export const Title = styled.div`
    font-size: 16px;
`;

export const Time = styled.div`
    font-size: 14px;
`;