import { mockCourses } from "../mock/courseMock";
import type { StudyBlock } from "../types/planner";
import { timeToMinutes } from "./time";


// 현재 공부 시간 계산 
export const calculateTotalStudyTime = (
    blocks: StudyBlock[]
) => {
    const totalMinutes = blocks.reduce((acc, block) => {

        const start = timeToMinutes(block.startTime);
        const end = timeToMinutes(block.endTime);

        return acc + (end - start);
    }, 0);

    return totalMinutes / 60;
}

// 강의별 공부 시간 계산
export const calculateCourseSummary = (
    blocks: StudyBlock[]
) => {

    const result: Record<string, number> = {};

    blocks.forEach((block) => {

        const start = timeToMinutes(block.startTime);
        const end = timeToMinutes(block.endTime);

        const duration = (end - start) / 60;

        const course = mockCourses.find(
            (course) => course.id === block.courseId
        );

        const title = course?.title ?? '기타';

        result[title] =
            (result[title] ?? 0) + duration;
    });

    return result;
};


// 요일별 공부 시간 계산
export const calculateDaySummary = (
    blocks: StudyBlock[]
) => {

    const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

    const result: Record<string, number> = {};

    blocks.forEach((block) => {

        const start = timeToMinutes(block.startTime);
        const end = timeToMinutes(block.endTime);

        const duration = (end - start) / 60;

        const day = DAYS[block.dayOfWeek];

        result[day] =
            (result[day] ?? 0) + duration;
    });

    return result;
};