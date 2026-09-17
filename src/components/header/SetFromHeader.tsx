// 편지 추가 - 프롬 선택 페이지 헤더

import TopSection from '@/components/header/TopSection';
import BackButton from '../common/header/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SetFromHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const state = location.state;

    if (state && state.mode === 'edit' && state.letterId) {
      navigate(`/letter/${state.letterId}/edit`, {
        replace: true,
        state,
      });
      return;
    }

    navigate('/create/detail', {
      replace: true,
      state,
    });
  };

  return (
    <TopSection
      left={<BackButton onClick={handleBack} />}
      center={<div className="text-lg font-semibold">From 선택</div>}
      right={
        <div className="flex items-center space-x-2 mr-2">
          <button
            type="button"
            className="text-base font-normal text-[#585A5F]"
            aria-label="관리"
            onClick={() => navigate('/my/from')}
          >
            관리
          </button>
        </div>
      }
    />
  );
}
