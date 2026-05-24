// 강의 추가 / 수정 모달
import { useEffect, useState } from 'react';
import { mockCourses } from '../mock/courseMock';
import type { StudyBlock } from '../types/planner';
import { timeToMinutes } from '../utils/time';
import * as s from './DraftModalStyle';

interface DraftModalProps {
    isOpen: boolean;
    selectedBlock: StudyBlock | null;
    onClose: () => void;
    onAddBlock: (block : StudyBlock) => boolean;
    onUpdateBlock: (block: StudyBlock) => boolean;
    onDeleteBlock: (id: string) => void;
    clickedSlot: {
        dayOfWeek: number;
        startTime: string;
    } | null;
}

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const TIMES = Array.from(
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

const DraftModal:React.FC<DraftModalProps> = ({
    isOpen,
    selectedBlock,
    onClose,
    onAddBlock,
    onUpdateBlock,
    onDeleteBlock,
    clickedSlot,
}) => {

    const [courseId, setCourseId] = useState(selectedBlock?.courseId ?? mockCourses[0].id);
    const [dayOfWeek, setDayOfWeek] = useState(selectedBlock?.dayOfWeek ?? 0);
    const [startTime, setStartTime] = useState(selectedBlock?.startTime ?? '09:00');
    const [endTime, setEndTime] = useState(selectedBlock?.endTime ?? '10:00');
    const [memo, setMemo] = useState(selectedBlock?.memo ?? '');

    useEffect(() => {
        if (selectedBlock) {
            setCourseId(selectedBlock.courseId);
            setDayOfWeek(selectedBlock.dayOfWeek);
            setStartTime(selectedBlock.startTime);
            setEndTime(selectedBlock.endTime);
            setMemo(selectedBlock.memo ?? '');
        } else {
            const startIndex = TIMES.indexOf(
                clickedSlot?.startTime ?? '09:00'
            )

            setCourseId(mockCourses[0].id);
            setDayOfWeek(clickedSlot?.dayOfWeek ?? 0);
            setStartTime(clickedSlot?.startTime ?? '09:00');
            setEndTime(TIMES[startIndex + 2] ?? '10:00');
            setMemo('');
        }

    }, [selectedBlock, clickedSlot]);
    
    const handleSubmit = () => {

        const start = timeToMinutes(startTime);
        const end = timeToMinutes(endTime);

        if (start >= end) {
            alert('종료 시간이 시작 시간보다 빨라요!');
            return;
        }

        const newBlock: StudyBlock = {
            id: selectedBlock?.id ?? crypto.randomUUID(),
            courseId,
            dayOfWeek,
            startTime,
            endTime,
            memo,
        };

        let success = false;

        if (selectedBlock) {
            success = onUpdateBlock(newBlock);

            if (success) {
                alert('수정되었습니다!');
            } else {
                alert('시간이 겹치는 수업이 있어요!');
            }
        } else {
            success = onAddBlock(newBlock);

            if (success) {
                alert('추가되었습니다!');
            } else {
                alert('시간이 겹치는 수업이 있어요!');
            }
        }

        if (success) onClose();

    };

    const handleDelete = () => {

        if (!selectedBlock) return;

        const isConfirm = window.confirm('수업을 삭제하시겠어요?');

        if (!isConfirm) return;

        onDeleteBlock(selectedBlock.id);

        alert('삭제되었습니다!');

        onClose();
    }

    if (!isOpen) return null;
    
    return (
         <s.ModalOverlay>
            <s.ModalContainer>


                <s.TopBar>
                    {selectedBlock && (
                            <s.DeleteBtn onClick={handleDelete}>
                                삭제
                            </s.DeleteBtn>
                        )}

                    <s.Title>
                        {selectedBlock ? '수업 수정' : '수업 추가'}
                    </s.Title>

                </s.TopBar>

                <s.Field>
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
                    <s.ConfirmBtn onClick={handleSubmit}> {selectedBlock ? '수정' : '추가'} </s.ConfirmBtn>
                </s.BtnGroup>


            </s.ModalContainer>
         </s.ModalOverlay>
    )

    
}

export default DraftModal;