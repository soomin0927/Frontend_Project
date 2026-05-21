// 시간표 블록 데이터 정의

export interface StudyBlock {
    id: string;
    courseId: string;
    dayOfWeek: number;      // 0(월) ~ 6(일) — 주의: JavaScript Date.getDay()는 0(일) 기준이므로 변환 필요
    startTime: string;      // "09:00" (HH:mm)
    endTime: string;        // "10:00" (HH:mm, 30분 단위는 가산점 사양)
    memo?: string;
}

export interface PlannerResponse {
    weekStart: string;      // 요청한 주의 월요일
    blocks: StudyBlock[];   // 저장된 블록 (없으면 빈 배열)
}