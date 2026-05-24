import { useEffect, useState } from "react";
import { fetchPlannerBlocks, savePlannerBlocks } from "../services/plannerApi";
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

const formatDateKey = (
    date: Date
) => {

    return date.toISOString().split('T')[0];
};

export const usePlanner = () => {

    const [serverBlocks, setServerBlocks] = useState<StudyBlock[]>([]);
    const [draftBlocks, setDraftBlocks] = useState<StudyBlock[]>([]);
    const [selectedBlock, setSelectedBlock] = useState<StudyBlock | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
    const [isLoading, setIsLoading] = useState(true);

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

            await savePlannerBlocks(
                formatDateKey(currentWeekStart),
                draftBlocks
            );

            setServerBlocks(draftBlocks);

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

        const loadBlocks = async () => {

            try {

                const response =
                    await fetchPlannerBlocks(formatDateKey(currentWeekStart));

                setServerBlocks(response.blocks);
                setDraftBlocks(response.blocks);

            } finally {

                setIsLoading(false);
            }
        };

        loadBlocks();

    }, [currentWeekStart]);

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
        isLoading,
    };

    
};