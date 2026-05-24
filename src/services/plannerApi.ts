import type { StudyBlock } from '../types/planner';

const getStorageKey = (
    weekStart: string
) => {

    return `planner_blocks_${weekStart}`;
};

// 조회
export const fetchPlannerBlocks = async (
    weekStart : string
) => {

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );

    const savedData =
        localStorage.getItem(getStorageKey(weekStart));

    const blocks: StudyBlock[] =
        savedData
            ? JSON.parse(savedData)
            : [];

    return {
        weekStart,
        blocks,
    };
};


// 저장
export const savePlannerBlocks = async (
    weekStart: string,
    blocks: StudyBlock[]
) => {

    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );

    localStorage.setItem(
        getStorageKey(weekStart),
        JSON.stringify(blocks)
    );

    return {
        success: true,
    };
};