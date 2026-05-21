// 시간표 블록 데이터
import type { StudyBlock } from '../types/planner';

export const mockBlocks: StudyBlock[] = [
  {
    id: '1',
    courseId: 'react',
    dayOfWeek: 0,
    startTime: '09:00',
    endTime: '11:00',
    memo: 'React hooks 정리',
  },
  {
    id: '2',
    courseId: 'spring',
    dayOfWeek: 2,
    startTime: '13:00',
    endTime: '15:00',
    memo: 'JPA 학습',
  },
];