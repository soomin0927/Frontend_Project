import { useState } from "react";
import { mockBlocks } from "../mock/plannerMock";
import type { StudyBlock } from "../types/planner";
import { hasTimeConflict } from "../utils/conflict";

export const usePlanner = () => {

    const [serverBlocks, setServerBlocks] = useState<StudyBlock[]>(mockBlocks);
    const [draftBlocks, setDraftBlocks] = useState<StudyBlock[]>(mockBlocks);
    const [selectedBlock, setSelectedBlock] = useState<StudyBlock | null>(null);

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

        const response = {
            weekStart: "2026-05-22",
            blocks: draftBlocks
        };

        // 서버 상태 동기화
        setServerBlocks(response.blocks);

        return true;
    };

    // dirty 상태
    const isDirty =
        JSON.stringify(serverBlocks) !== JSON.stringify(draftBlocks);

    return {
        serverBlocks,
        draftBlocks,
        selectedBlock,
        setSelectedBlock,

        addBlock,
        updateBlock,
        deleteBlock,
        saveBlocks,

        isDirty
    };
};