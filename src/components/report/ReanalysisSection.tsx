import { useState } from 'react';

import type { ReportReanalyze } from '@/types/report';
import ConfirmModal from '@/components/common/ConfirmModal';
import ReanalyzeButton from './ReanalyzeButton';

interface ReanalysisSectionProps {
  reanalyze: ReportReanalyze;
  isPending?: boolean;
  onReanalyze: () => void;
}

export default function ReanalysisSection({
  reanalyze,
  isPending = false,
  onReanalyze,
}: ReanalysisSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
    onReanalyze();
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {reanalyze.message && (
        <p className="whitespace-nowrap text-[11px] font-medium text-[#F02E2E]">
          {reanalyze.message.replace(/\.$/, '')}
        </p>
      )}

      <ReanalyzeButton
        disabled={!reanalyze.enabled}
        isPending={isPending}
        onClick={() => setIsModalOpen(true)}
      />

      <ConfirmModal
        open={isModalOpen}
        title="다시 분석할까요?"
        description="이전 분석 내용은 저장되지 않아요"
        cancelText="취소"
        confirmText="분석하기"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
