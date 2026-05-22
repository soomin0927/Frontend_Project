// 하나의 시간표 블록 UI
import type { StudyBlock } from '../types/planner';
import * as s from './StudyBlockItemStyle';


interface StudyBlockProps {
    block: StudyBlock;

    title: string;
    color: string;
    top: number;
    height: number;

    onClick: () => void;
}

const StudyBlockItem:React.FC<StudyBlockProps> = ({
    block,
    title,
    color,
    top,
    height,
    onClick,
}) => {

    return (
        <s.Block onClick={onClick}
            $top={top}
            $height={height}
            $color={color}
        >
        
        <s.Info>
            <s.Title>
                {title}
            </s.Title>

            <s.Time>
                {block.startTime}
                ~
                {block.endTime}
            </s.Time>
        </s.Info> 
        
        </s.Block>
    )
}

export default StudyBlockItem;