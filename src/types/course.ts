// 강의 데이터 정의

export interface Course {
    id: string;
    title: string;
    color: string;          // 블록 표시 색상 (예: "#4A90D9")
}

export interface CourseListResponse {
    courses: Course[];
}