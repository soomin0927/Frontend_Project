// 시간 겹침 검사

import type { StudyBlock } from "../types/planner";
import { timeToMinutes } from "./time";

export const hasTimeConflict = (
    newBlock : StudyBlock,
    blocks : StudyBlock[]
) => {
    return blocks.some((block) => {

        if (block.dayOfWeek !== newBlock.dayOfWeek) {
            return false;
        }

        const newStart = timeToMinutes(newBlock.startTime);
        const newEnd = timeToMinutes(newBlock.endTime);

        const start = timeToMinutes(block.startTime);
        const end = timeToMinutes(block.endTime);

        return (
            newStart < end &&
            newEnd > start
        );
    })
}