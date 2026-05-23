// 시간표 전체 그리드
import { useState } from 'react';
import { mockCourses } from '../mock/courseMock';
// import { mockBlocks } from '../mock/plannerMock';
// import type { StudyBlock } from '../types/planner';
// import { hasTimeConflict } from '../utils/conflict';
import { usePlanner } from '../hooks/usePlanner';
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

  const {
      draftBlocks,
      selectedBlock,
      setSelectedBlock,
      addBlock,
      updateBlock,
      deleteBlock,
      saveBlocks,
      isDirty
  } = usePlanner();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [draftBlocks, setDraftBlocks] = useState<StudyBlock[]>(mockBlocks);
  // const [selectedBlock, setSelectedBlock] = useState<StudyBlock | null>(null);

  // const addBlock = (newBlock : StudyBlock) => {

  //     const isConflict = hasTimeConflict(
  //       newBlock, 
  //       draftBlocks
  //     )

  //     if (isConflict) {
  //       alert('시간이 겹치는 수업이 있어요!');
  //       return false;
  //     }

  //     setDraftBlocks((prev) => [
  //         ...prev,
  //         newBlock
  //     ]);

  //     return true;
  // };

  // const updateBlock = (updatedBlock: StudyBlock) => {

  //     const isConflict = hasTimeConflict(
  //         updatedBlock,
  //         draftBlocks.filter(
  //             (block) => block.id !== updatedBlock.id
  //         )
  //     );

  //     if (isConflict) {
  //         alert('시간이 겹치는 수업이 있어요!');
  //         return false;
  //     }

  //     setDraftBlocks((prev) =>
  //         prev.map((block) =>
  //             block.id === updatedBlock.id
  //                 ? updatedBlock
  //                 : block
  //         )
  //     );

  //     return true;
  // };



  return (

    <s.Container>
      <s.TopBar>

          <s.SaveBtn disabled={!isDirty} onClick={async () =>{
              const success = await saveBlocks();

              if(success) {
                alert('저장 완료!');
              } else {
                alert('충돌이 있어 저장할 수 없어요!');
              }

          }}>
            저장
          </s.SaveBtn>
          
          <s.AddBtn
              onClick={() => {
                  setSelectedBlock(null);
                  setIsModalOpen(true);
              }}
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
                  {draftBlocks
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
                                    onClick={() => {
                                      setSelectedBlock(block);
                                      setIsModalOpen(true);
                                    }}
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
          selectedBlock = {selectedBlock}
          onUpdateBlock={updateBlock}
        />
      </s.Container>
  );
};
        
  
export default PlannerGrid;