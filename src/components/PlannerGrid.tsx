// 시간표 전체 그리드
import { useState } from 'react';
import { mockCourses } from '../mock/courseMock';
import { mockBlocks } from '../mock/plannerMock';
import type { StudyBlock } from '../types/planner';
import { calculateBlockHeight, calculateBlockTop } from '../utils/time';
import DraftModal from './DraftModal';
import * as s from './PlannerGridStyle';
import StudyBlockItem from './StudyBlockItem';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const HOURS = Array.from(
  { length: 13 },
  (_, index) => index + 8 
  // 과제 조건 : 08:00 ~ 20:00 이라서 index는 0부터 시작하니까 + 8씩 하면 20시까지 구현 가능
);

const PlannerGrid:React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blocks, setBlocks] = useState<StudyBlock[]>(mockBlocks);

  const addBlock = (newBlock : StudyBlock) => {
      setBlocks((prev) => [
          ...prev,
          newBlock
      ]);
  };

  return (

    <s.Container>
      <s.TopBar>
          
          <s.AddBtn
              onClick={() =>
                  setIsModalOpen(true)
              }
          >
              + 수업 추가
          </s.AddBtn>

      </s.TopBar>



        {/* 요일 헤더 */}
        <s.HeaderRow>

          <s.TimeHeader />
          {DAYS.map((day) => (
            <s.DayHeader key={day}>
              {day}
            </s.DayHeader>
          ))}

        </s.HeaderRow>

        {/* 시간표 영역 */}
        <s.Body>

          {/* 시간 컬럼 */}
          <s.TimeColumn>
            {HOURS.map((hour) => (
              <s.TimeCell key={hour}>
                {String(hour).padStart(2, '0')}:00
              </s.TimeCell>
            ))}
          </s.TimeColumn>

          {/* 요일 컬럼 */}
          <s.GridColumns>
              {DAYS.map((day, index) => (
                  <s.DayColumn key={day}>
                  
                  {/* 시간 */}
                  {HOURS.map((hour) => (
                      <s.GridCell key={hour} />
                  ))}

                  {/* 블록 렌더링 */}
                  {blocks
                        .filter(
                            (block) =>
                                block.dayOfWeek === index
                        )
                        .map((block) => {

                            const course = mockCourses.find(
                                (course) =>
                                    course.id === block.courseId
                            );

                            return (
                                <StudyBlockItem
                                    key={block.id}
                                    block={block}
                                    title={course?.title ?? ''}
                                    color={course?.color ?? '#999'}
                                    top={calculateBlockTop(block.startTime)}
                                    height={calculateBlockHeight(
                                        block.startTime,
                                        block.endTime
                                    )}
                                />
                            );
                        })}
                  </s.DayColumn>
              ))}
          </s.GridColumns>

        </s.Body>


      <DraftModal
          isOpen={isModalOpen}
          onClose={() =>
            setIsModalOpen(false)
          }
          onAddBlock={addBlock}
        />
      </s.Container>
  );
};
        
  
export default PlannerGrid;