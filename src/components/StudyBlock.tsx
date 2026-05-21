// 하나의 시간표 블록 UI
import type { StudyBlock } from '../types/planner';
import * as s from './StudyBlockStyle';


interface StudyBlockProps {
    block: StudyBlock;

    title: string;
    color: string;
    top: number;
    height: number;
}

const StudyBlock:React.FC<StudyBlockProps> = ({
    block,
    title,
    color,
    top,
    height,
}) => {

    return (
        <s.Block
            $top={top}
            $height={height}
            $color={color}
        >
            <s.Title>
                {title}
            </s.Title>

            <s.Time>
                {block.startTime}
                ~
                {block.endTime}
            </s.Time>
        
        </s.Block>
    )
}

export default StudyBlock;