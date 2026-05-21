// API 요청/응답 데이터 타입
import type { StudyBlock } from "./planner";

export interface SavePlannerRequest {
    weekStart: string;
    blocks: Array<{
    id?: string;          // 기존 블록은 id 포함, 신규는 생략 (서버가 생성)
    courseId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    memo?: string;
  }>;
}

export interface SavePlannerResponse {
    weekStart: string;
    blocks: StudyBlock[];   // 저장 후 확정된 블록 (id 포함)
}

export interface ErrorResponse {
    code: string;
    message: string;
}