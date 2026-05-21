// 시간표 전체 그리드
import * as s from './PlannerGridStyle';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const HOURS = Array.from(
  { length: 13 },
  (_, index) => index + 8 
  // 과제 조건 : 08:00 ~ 20:00 이라서 index는 0부터 시작하니까 + 8씩 하면 20시까지 구현 가능
);

const PlannerGrid:React.FC = () => {

  return (
    <s.Container>

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
            {DAYS.map((day) => (
                <s.DayColumn key={day}>
                {HOURS.map((hour) => (
                    <s.GridCell key={hour} />
                ))}
                </s.DayColumn>
            ))}
        </s.GridColumns>

      </s.Body>

    </s.Container>
  );
};
        
  
export default PlannerGrid;