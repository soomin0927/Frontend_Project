import { useEffect, useState } from "react";
import { mockBlocks } from "../mock/plannerMock";
import type { StudyBlock } from "../types/planner";
import { hasTimeConflict } from "../utils/conflict";

const getWeekStart = (date: Date) => {

    const current = new Date(date);

    const day = current.getDay();

    // 일요일(0)
    const diff =
        day === 0
            ? -6
            : 1 - day;

    current.setDate(current.getDate() + diff);

    return current;
};

export const usePlanner = () => {

    const STORAGE_KEY = 'planner_blocks';

    const savedData = localStorage.getItem(STORAGE_KEY);
    const initialBlocks = savedData
            ? JSON.parse(savedData)
            : mockBlocks; 
    const [serverBlocks, setServerBlocks] = useState<StudyBlock[]>(initialBlocks);
    const [draftBlocks, setDraftBlocks] = useState<StudyBlock[]>(initialBlocks);
    const [selectedBlock, setSelectedBlock] = useState<StudyBlock | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));

    // 충돌 체크
    const checkConflict = (target: StudyBlock, list: StudyBlock[]) => {
        return hasTimeConflict(
            target,
            list.filter(b => b.id !== target.id)
        );
    };

    // 추가
    const addBlock = (block: StudyBlock) => {
        if (checkConflict(block, draftBlocks)) {
            return false;
        }

        setDraftBlocks(prev => [...prev, block]);
        return true;
    };

    // 수정
    const updateBlock = (block: StudyBlock) => {
        if (checkConflict(block, draftBlocks)) {
            return false;
        }

        setDraftBlocks(prev =>
            prev.map(b => b.id === block.id ? block : b)
        );

        return true;
    };

    // 삭제 
    const deleteBlock = (id: string) => {
        setDraftBlocks(prev => prev.filter(b => b.id !== id));
    };

    // 저장 
    const saveBlocks = async () => {

        const hasConflict = draftBlocks.some(block =>
            checkConflict(block, draftBlocks)
        );

        if (hasConflict) {
            return false;
        }

        try {

            setIsSaving(true);

            // mock API 요청 느낌
            await new Promise(resolve =>
                setTimeout(resolve, 1500)
            );

            const response = {
                weekStart: "2026-05-22",
                blocks: draftBlocks
            };

            setServerBlocks(response.blocks);

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(response.blocks)
            );

            return true;

        } catch (error) {

            return false;

        } finally {

            setIsSaving(false);
        }
    };

    // dirty 상태
    const isDirty =
        JSON.stringify(serverBlocks) !== JSON.stringify(draftBlocks);

    useEffect(() => {

        const handleBeforeUnload = (
            event: BeforeUnloadEvent
        ) => {

            if (!isDirty) return;

            event.preventDefault();

            event.returnValue = '';
        };

        window.addEventListener(
            'beforeunload',
            handleBeforeUnload
        );

        return () => {

            window.removeEventListener(
                'beforeunload',
                handleBeforeUnload
            );
        };

    }, [isDirty]);

    return {
        serverBlocks,
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
    };

    
};