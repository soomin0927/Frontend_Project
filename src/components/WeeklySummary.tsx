// 주간 공부시간 요약
import type { StudyBlock } from '../types/planner';
import { calculateCourseSummary, calculateDaySummary, calculateTotalStudyTime } from '../utils/summary';
import * as s from './WeeklySummaryStyle';

interface WeeklySummaryProps {
    blocks: StudyBlock[];
}

const WeeklySummary:React.FC<WeeklySummaryProps> = ({
    blocks
}) => {

    const totalTime = calculateTotalStudyTime(blocks);
    const courseSummary = calculateCourseSummary(blocks);
    const daySummary = calculateDaySummary(blocks);


    return (
        <s.Con>

            <s.Title> 주간 학습 요약 </s.Title>


            <s.SummarySection>
                <s.Section> 
                    <s.SubTitle> 총 학습 시간  </s.SubTitle>
                    <s.Text>
                        {totalTime} 시간
                    </s.Text>
                </s.Section>

                <s.Section>
                    <s.SubTitle> 강의별 학습 시간 </s.SubTitle>
                    
                    {Object.entries(courseSummary).map(
                        ([course, time]) => (
                            <s.Text key={course}>
                                {course} : {time}시간
                            </s.Text>
                        )
                    )}
                </s.Section>

                <s.Section>
                    <s.SubTitle> 요일별 학습 시간 </s.SubTitle>
                    
                    {Object.entries(daySummary).map(
                        ([day, time]) => (
                            <s.Text key={day}>
                                {day} : {time}시간
                            </s.Text>
                        )
                    )}
                </s.Section>
            </s.SummarySection>
        </s.Con>
    )
}

export default WeeklySummary;