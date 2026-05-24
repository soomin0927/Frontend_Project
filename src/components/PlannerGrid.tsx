// 시간표 전체 그리드
import { useState } from 'react';
import { usePlanner } from '../hooks/usePlanner';
import { mockCourses } from '../mock/courseMock';
import { calculateBlockHeight, calculateBlockTop } from '../utils/time';
import DraftModal from './DraftModal';
import * as s from './PlannerGridStyle';
import StudyBlockItem from './StudyBlockItem';
import WeeklySummary from './WeeklySummary';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const HOURS = Array.from(
    { length: 25 },
    (_, index) => {

        const hour =
            Math.floor(index / 2) + 8;

        const minute =
            index % 2 === 0
                ? '00'
                : '30';

        return `${String(hour).padStart(2, '0')}:${minute}`;
    }
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
      isDirty,
      isSaving,
      currentWeekStart,
      setCurrentWeekStart,
  } = usePlanner();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEmpty = draftBlocks.length === 0;

  const moveWeek = (diff: number) => {

      const nextWeek = new Date(currentWeekStart);

      nextWeek.setDate(
          nextWeek.getDate() + diff * 7
      );

      setCurrentWeekStart(nextWeek);
  };

  const formatWeek = () => {

      return currentWeekStart.toLocaleDateString(
          'ko-KR',
          {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          }
      );
  };

  return (

    <s.Container>
      
      <s.TopBar>

          <s.SaveBtn disabled={!isDirty || isSaving} onClick={async () =>{
              const success = await saveBlocks();

              if(success) {
                alert('저장 완료!');
              } else {
                alert('충돌이 있어 저장할 수 없어요!');
              }

          }}>
            {isSaving ? '저장 중...' : '저장'}
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

      <s.WeekNavigator>

            <s.MoveBtn
                onClick={() => moveWeek(-1)}
            >
                ←
            </s.MoveBtn>

            <s.WeekText>
                {formatWeek()} 주
            </s.WeekText>

            <s.MoveBtn
                onClick={() => moveWeek(1)}
            >
                →
            </s.MoveBtn>

        </s.WeekNavigator>

      <WeeklySummary blocks={draftBlocks}/> {/* 편집 중에도 실시간 반영 */}

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
                {/* {String(hour).padStart(2, '0')}:00 */}
                {hour}
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

              {isEmpty && (
                    <s.EmptyOverlay>

                        <s.EmptyTitle>
                            아직 등록된 수업이 없어요!
                        </s.EmptyTitle>

                        <s.EmptyText>
                            + 수업 추가 버튼으로 학습 계획을 만들어보세요!
                        </s.EmptyText>

                    </s.EmptyOverlay>
                )}
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
          onDeleteBlock={deleteBlock}
        />
      </s.Container>
  );
};
        
  
export default PlannerGrid;