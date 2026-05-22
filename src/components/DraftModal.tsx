// 강의 추가 / 수정 모달
import { useState } from 'react';
import { mockCourses } from '../mock/courseMock';
import type { StudyBlock } from '../types/planner';
import * as s from './DraftModalStyle';

interface DraftModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddBlock: (block : StudyBlock) => void;
}

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const TIMES = Array.from(
    { length: 13 },
    (_, index) =>
        `${String(index + 8).padStart(2, '0')}:00`
);

const DraftModal:React.FC<DraftModalProps> = ({
    isOpen,
    onClose,
    onAddBlock,
}) => {

    const [courseId, setCourseId] = useState(mockCourses[0].id);
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');
    const [memo, setMemo] = useState('');
    
    const handleSubmit = () => {

        onAddBlock({
            id: crypto.randomUUID(),
    
            courseId,
            dayOfWeek,
            startTime,
            endTime,
            memo,
        });

        onClose();
    };
    
    if (!isOpen) return null;

    return (
         <s.ModalOverlay>
            <s.ModalContainer>

                <s.Title>
                    수업 추가
                </s.Title>

                <s.Field>
                    {/* 1. 강의선택 */}
                    <s.Label> 강의선택 </s.Label>

                    <s.Select 
                        value={courseId}
                        onChange={(e) => 
                            setCourseId(e.target.value)
                        }
                    >

                    {mockCourses.map(
                            (course) => (
                                <option
                                    key={course.id}
                                    value={course.id}
                                >
                                    {course.title}
                                </option>
                            )
                        )}

                    </s.Select>

                </s.Field>

                <s.Field>
                    {/* 2. 요일선택 */}
                    <s.Label> 요일선택 </s.Label>

                    <s.Select 
                        value={dayOfWeek}
                        onChange={(e) => 
                            setDayOfWeek(
                                Number(e.target.value)
                            )
                        }
                    >

                    {DAYS.map(
                            (day, index) => (
                                <option
                                    key={day}
                                    value={index}
                                >
                                    {day}
                                </option>
                            )
                        )}

                    </s.Select>
                </s.Field>

                <s.Field>
                    {/* 3. 시작시간*/}
                    <s.Label> 시작시간  </s.Label>

                    <s.Select 
                        value={startTime}
                        onChange={(e) => 
                            setStartTime(e.target.value)
                        }
                    >

                    {TIMES.map(
                            (time) => (
                                <option
                                    key={time}
                                    value={time}
                                >
                                    {time}
                                </option>
                            )
                        )}

                    </s.Select>
                </s.Field>

                <s.Field>
                    {/* 4. 종료시간 */}
                    <s.Label> 종료시간  </s.Label>

                    <s.Select 
                        value={endTime}
                        onChange={(e) => 
                            setEndTime(e.target.value)
                        }
                    >

                    {TIMES.map(
                            (time) => (
                                <option
                                    key={time}
                                    value={time}
                                >
                                    {time}
                                </option>
                            )
                        )}

                    </s.Select>
                </s.Field>

                <s.Field>
                    {/* 5. 메모 */}
                    <s.Label> 메모 </s.Label>

                    <s.TextArea
                        maxLength = {200}
                        value = {memo}
                        onChange = {(e) => 
                            setMemo(e.target.value)
                        }
                    />
                </s.Field>

                <s.BtnGroup>
                    <s.CancelBtn onClick={onClose}> 취소 </s.CancelBtn>
                    <s.ConfirmBtn onClick={handleSubmit}> 확인 </s.ConfirmBtn>
                </s.BtnGroup>


            </s.ModalContainer>
         </s.ModalOverlay>
    )

    
}

export default DraftModal;