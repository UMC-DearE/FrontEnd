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
    <div className="relative flex items-center justify-end">
      {reanalyze.message && (
        <p className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-medium text-[#F02E2E]">
          {reanalyze.message}
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
